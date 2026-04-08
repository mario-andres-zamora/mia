const authService = require('../services/authService');
const logger = require('../config/logger');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.googleAuth = catchAsync(async (req, res, next) => {
    const { credential } = req.body;
    
    if (!credential) {
        return next(new AppError('Token de Google no proporcionado', 400));
    }

    // Delegar a la capa de servicio (el servicio lanzará AppError si está inactivo)
    const user = await authService.googleAuth(credential);

    // Guardar sesión (Cookie HTTP-Only se enviará automáticamente)
    req.session.userId = user.id;
    req.session.email = user.email;

    // Registrar actividad
    await authService.logActivity(user.id, 'login', req.ip, req.get('user-agent'));

    // Obtener estadísticas complementarias
    const stats = await authService.getUserStats(user.id);

    res.json({
        success: true,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            employeeId: user.employee_id,
            department: user.department,
            position: user.position,
            role: user.role,
            is_active: !!user.is_active,
            profilePicture: user.profile_picture,
            points: stats?.points || 0,
            level: stats?.level || 'Novato',
            stats: stats || { completed_lessons: 0 }
        }
    });
});

exports.logout = catchAsync(async (req, res, next) => {
    if (req.session.userId) {
        await authService.logActivity(req.session.userId, 'logout', req.ip);
    }

    req.session.destroy((err) => {
        if (err) {
            logger.error('Error al destruir sesión:', err);
            return next(new AppError('Error al cerrar sesión', 500));
        }
        res.clearCookie('connect.sid'); 
        res.json({ success: true, message: 'Sesión cerrada correctamente' });
    });
});

exports.verifySession = catchAsync(async (req, res, next) => {
    const userId = req.session.userId;

    if (!userId) {
        return next(new AppError('Sesión expirada o no válida', 401));
    }

    const user = await authService.getSessionUserInfo(userId);

    if (!user || !user.is_active) {
        return next(new AppError('Usuario no válido o desactivado', 401));
    }

    res.json({
        valid: true,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            profilePicture: user.profile_picture,
            role: user.role,
            is_active: !!user.is_active,
            points: user.points || 0,
            level: user.level || 'Novato'
        }
    });
});
