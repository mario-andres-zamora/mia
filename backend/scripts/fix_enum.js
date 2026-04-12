const db = require('../config/database');

async function fixEnum() {
    try {
        console.log('Iniciando actualización de ENUM...');
        const query = "ALTER TABLE gamification_activities MODIFY COLUMN activity_type ENUM('lesson_completed','quiz_passed','module_completed','phishing_reported','perfect_score','early_completion','survey_completed','resource_downloaded','assignment_submitted','assignment_graded','badge_earned') NOT NULL";
        await db.query(query);
        console.log('✅ ENUM actualizado correctamente: se agregó badge_earned');
    } catch (error) {
        console.error('❌ Error al actualizar ENUM:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

fixEnum();
