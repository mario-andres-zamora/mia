const db = require('../config/database');

/**
 * Caché de niveles y settings para evitar consultas constantes a la BD
 */
let cachedLevels = null;
let cachedSettings = null;

/**
 * Obtiene los ajustes del sistema (puntos por lección, etc)
 */
const getSystemSettings = async (forceRefresh = false) => {
    try {
        if (!cachedSettings || forceRefresh) {
            const settingsRaw = await db.query('SELECT setting_key, setting_value FROM system_settings');
            const settings = {};
            settingsRaw.forEach(s => {
                settings[s.setting_key] = s.setting_value;
            });
            cachedSettings = {
                points_per_lesson: parseInt(settings.points_per_lesson) || 10,
                points_per_quiz: parseInt(settings.points_per_quiz) || 50,
                bonus_perfect_score: parseInt(settings.bonus_perfect_score) || 25
            };
        }
        return cachedSettings;
    } catch (error) {
        console.error('Error fetching system settings:', error);
        return {
            points_per_lesson: 10,
            points_per_quiz: 50,
            bonus_perfect_score: 25
        };
    }
};

/**
 * Obtiene los niveles definidos en el sistema (desde BD o fallback)
 */
const getLevels = async (forceRefresh = false) => {
    try {
        if (!cachedLevels || forceRefresh) {
            const levels = await db.query('SELECT name, min_points as minPoints, icon FROM gamification_levels ORDER BY min_points ASC');
            if (levels && levels.length > 0) {
                cachedLevels = levels;
            } else {
                // Fallback por si la tabla está vacía
                cachedLevels = [
                    { name: 'Novato', minPoints: 0, icon: 'Award' },
                    { name: 'Defensor', minPoints: 100, icon: 'Shield' },
                    { name: 'Guardián', minPoints: 500, icon: 'ShieldAlert' },
                    { name: 'CISO Honorario', minPoints: 1000, icon: 'Trophy' }
                ];
            }
        }
        return cachedLevels;
    } catch (error) {
        console.error('Error fetching gamification levels:', error);
        return [
            { name: 'Novato', minPoints: 0, icon: 'Award' },
            { name: 'Defensor', minPoints: 100, icon: 'Shield' },
            { name: 'Guardián', minPoints: 500, icon: 'ShieldAlert' },
            { name: 'CISO Honorario', minPoints: 1000, icon: 'Trophy' }
        ];
    }
};

/**
 * Calcula el nivel actual basado en los puntos
 */
const calculateLevel = async (points) => {
    const levels = await getLevels();
    let currentLevel = levels[0].name;
    let currentRank = 1;

    for (let i = 0; i < levels.length; i++) {
        if (points >= levels[i].minPoints) {
            currentLevel = levels[i].name;
            currentRank = i + 1;
        } else {
            break;
        }
    }
    return { name: currentLevel, rank: currentRank };
};

/**
 * Calcula un bonus dinámico al completar un módulo basado en:
 * 1. Rango en el departamento (10-1 pts)
 * 2. Desempeño en cuestionarios (10-0 pts)
 * 3. Eficiencia de tiempo (10-0 pts, premia la precisión)
 * 4. Encuestas (+3 pts adicionales)
 */
const calculateDynamicModuleBonus = async (userId, moduleId) => {
    try {
        // 1. Obtener información del usuario (Departamento)
        const [user] = await db.query('SELECT department FROM users WHERE id = ?', [userId]);
        const dept = user?.department || 'General';

        // 2. Bono de Rango (Máx 10) - Los primeros de su área ganan más
        const [completions] = await db.query(
            `SELECT COUNT(*) as count FROM gamification_activities ga
             JOIN users u ON ga.user_id = u.id
             WHERE ga.activity_type = 'module_completed' AND ga.reference_id = ? AND u.department = ?`,
            [moduleId, dept]
        );
        const rankPoints = Math.max(1, 10 - (completions.count || 0));

        // 3. Bono de Desempeño (Máx 10) - Basado en intentos y nota 100%
        const quizzes = await db.query('SELECT id FROM quizzes WHERE module_id = ? AND is_published = 1', [moduleId]);
        let performancePoints = 0; // REFINADO: 0 si no hay cuestionarios
        
        if (quizzes.length > 0) {
            let totalWeightedScore = 0;
            for (const q of quizzes) {
                // Obtener el primer intento aprobado
                const [attempt] = await db.query(
                    'SELECT score, attempt_number FROM quiz_attempts WHERE user_id = ? AND quiz_id = ? AND passed = 1 ORDER BY created_at ASC LIMIT 1',
                    [userId, q.id]
                );
                
                if (attempt) {
                    let attemptWeight = 0;
                    if (attempt.attempt_number === 1) attemptWeight = 1.0;      // 100% del bono
                    else if (attempt.attempt_number === 2) attemptWeight = 0.6; // 60% del bono
                    else if (attempt.attempt_number === 3) attemptWeight = 0.3; // 30% del bono
                    
                    totalWeightedScore += (attempt.score / 100) * attemptWeight;
                }
            }
            performancePoints = Math.round((totalWeightedScore / quizzes.length) * 10);
        }

        // 4. Bono de Tiempo (Máx 10) - PREMIA LA PRECISIÓN (90% - 110%)
        const [mod] = await db.query('SELECT duration_minutes FROM modules WHERE id = ?', [moduleId]);
        let estimated = mod?.duration_minutes || 0;
        
        // Fallback si la duración del módulo es 0: sumar lecciones
        if (estimated === 0) {
            const [lessonSum] = await db.query('SELECT SUM(duration_minutes) as sum FROM lessons WHERE module_id = ? AND is_optional = 0', [moduleId]);
            estimated = lessonSum.sum || 30; // Fallback 30 min
        }

        const [spentLessons] = await db.query('SELECT SUM(time_spent_minutes) as sum FROM user_progress WHERE user_id = ? AND module_id = ?', [userId, moduleId]);
        const [spentQuizzes] = await db.query(
            'SELECT SUM(qa.time_spent_minutes) as sum FROM quiz_attempts qa JOIN quizzes q ON qa.quiz_id = q.id WHERE qa.user_id = ? AND q.module_id = ?',
            [userId, moduleId]
        );
        
        const actual = (spentLessons.sum || 0) + (spentQuizzes.sum || 0);
        const ratio = actual / estimated;
        
        let timePoints = 0;
        if (ratio >= 0.9 && ratio <= 1.1) timePoints = 10;      // Perfecta precisión
        else if ((ratio >= 0.7 && ratio < 0.9) || (ratio > 1.1 && ratio <= 1.3)) timePoints = 7; // Buena
        else if ((ratio >= 0.5 && ratio < 0.7) || (ratio > 1.3 && ratio <= 1.6)) timePoints = 3; // Regular
        else timePoints = 0;

        // 5. Bono de Encuesta (+3 puntos adicionales)
        const [survey] = await db.query(
            `SELECT COUNT(*) as count FROM survey_responses sr 
             JOIN surveys s ON sr.survey_id = s.id 
             WHERE s.module_id = ? AND sr.user_id = ?`,
            [moduleId, userId]
        );
        const surveyBonus = survey.count > 0 ? 3 : 0;

        return rankPoints + performancePoints + timePoints + surveyBonus;
    } catch (error) {
        console.error('Error calculating dynamic bonus:', error);
        return 0; // Fallback seguro
    }
};

/**
 * Sincroniza el nivel del usuario en la base de datos
 */
const syncUserLevel = async (userId) => {
    try {
        const [userData] = await db.query('SELECT points, level FROM user_points WHERE user_id = ?', [userId]);
        if (!userData) return null;

        const currentPoints = userData.points;
        const oldLevel = userData.level;
        const levelInfo = await calculateLevel(currentPoints);
        const newLevel = levelInfo.name;

        // Siempre sincronizamos con Redis para asegurar que el ranking sea en tiempo real
        await updateUserScore(userId, currentPoints);

        if (oldLevel !== newLevel) {
            await db.query('UPDATE user_points SET level = ?, last_updated = NOW() WHERE user_id = ?', [newLevel, userId]);
            return {
                leveledUp: true,
                oldLevel: oldLevel,
                newLevel: newLevel,
                levelNumber: levelInfo.rank
            };
        }

        return {
            leveledUp: false,
            currentLevel: newLevel,
            levelNumber: levelInfo.rank
        };
    } catch (error) {
        console.error('Error syncing user level:', error);
        return null;
    }
};

/**
 * Verifica si un usuario ha completado todo el contenido de un módulo
 * y registra la actividad si es necesario.
 */
const checkAndRecordModuleCompletion = async (userId, moduleId, isAdmin = false) => {
    try {
        // 1. Verificar si ya tiene el certificado (lo que realmente importa)
        const [existingCert] = await db.query(
            "SELECT id FROM certificates WHERE user_id = ? AND module_id = ?",
            [userId, moduleId]
        );
        if (existingCert) return { completed: true, alreadyRecorded: true };

        // 2. Verificar si ya se registró la actividad previamente (para backfill)
        const [existingActivity] = await db.query(
            "SELECT id FROM gamification_activities WHERE user_id = ? AND activity_type = 'module_completed' AND reference_id = ?",
            [userId, moduleId]
        );

        // 3. Si NO hay actividad previa, verificar requisitos (lecciones y quizzes)
        if (!existingActivity) {
            // Verificar lecciones obligatorias no completadas
            const [incompleteLessons] = await db.query(
                `SELECT COUNT(*) as count FROM lessons l
                 LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
                 WHERE l.module_id = ? 
                 ${isAdmin ? '' : 'AND l.is_published = TRUE'} 
                 AND l.is_optional = FALSE
                 AND (up.status IS NULL OR up.status != 'completed')`,
                [userId, moduleId]
            );
            if (incompleteLessons.count > 0) return { completed: false };

            // Verificar quizzes obligatorios no aprobados
            const [incompleteQuizzes] = await db.query(
                `SELECT COUNT(*) as count FROM quizzes q
                 WHERE q.module_id = ? 
                 ${isAdmin ? '' : 'AND q.is_published = TRUE'}
                 AND q.id NOT IN (
                    SELECT quiz_id FROM quiz_attempts WHERE user_id = ? AND passed = TRUE
                 )`,
                [userId, moduleId, userId]
            );
            if (incompleteQuizzes.count > 0) return { completed: false };
        }

        // 4. Si llegamos aquí, el módulo está completo (o ya estaba registrado).
        // Verificar si el módulo debe generar certificado
        const [moduleData] = await db.query("SELECT generates_certificate FROM modules WHERE id = ?", [moduleId]);
        const shouldGenerate = moduleData ? !!moduleData.generates_certificate : true;

        if (shouldGenerate) {
            // Generar Certificado
            const certificateCode = `CERT-${userId}-${moduleId}-${Date.now()}`;
            await db.query(
                `INSERT INTO certificates (user_id, module_id, issued_at, certificate_code) 
                 VALUES (?, ?, NOW(), ?)`,
                [userId, moduleId, certificateCode]
            );
        }

        // 5. Registrar actividad y dar puntos (solo si es nuevo)
        let bonusPoints = 0;
        if (!existingActivity) {
            // Calcular bonus dinámico
            bonusPoints = await calculateDynamicModuleBonus(userId, moduleId);

            await db.query(
                `INSERT INTO gamification_activities (user_id, activity_type, points_earned, reference_id) 
                 VALUES (?, 'module_completed', ?, ?)`,
                [userId, bonusPoints, moduleId]
            );

            // Sumar puntos al balance
            // Actualizar puntos
            await db.query(
                `INSERT INTO user_points (user_id, points) VALUES (?, ?) 
                 ON DUPLICATE KEY UPDATE points = points + ?`,
                [userId, bonusPoints, bonusPoints]
            );

            // Obtener nuevo balance
            const [newPoints] = await db.query(
                `SELECT points FROM user_points WHERE user_id = ?`,
                [userId]
            );
            
            // Sincronizar con Redis para ranking en tiempo real
            if (newPoints && newPoints.points !== undefined) {
                await updateUserScore(userId, newPoints.points);
            }
        }

        return {
            completed: true,
            newlyRecorded: !existingActivity,
            bonusPoints,
            certificateGenerated: shouldGenerate,
            generatesCertificate: shouldGenerate,
            id: moduleId
        };
    } catch (error) {
        console.error('Error checking module completion:', error);
        return { error: true };
    }
};

const redisClient = require('../config/redis');

/**
 * Actualiza el puntaje del usuario en Redis para el ranking en tiempo real
 */
const updateUserScore = async (userId, points) => {
    try {
        if (redisClient && redisClient.isOpen) {
            // Usamos un Sorted Set para el ranking global
            await redisClient.zAdd('leaderboard:points', {
                score: points,
                value: userId.toString()
            });
            return true;
        }
    } catch (error) {
        console.error('Error updating user score in Redis:', error);
    }
    return false;
};

module.exports = {
    getLevels,
    calculateLevel,
    syncUserLevel,
    getSystemSettings,
    checkAndRecordModuleCompletion,
    updateUserScore
};
