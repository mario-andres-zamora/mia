const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');
const logger = require('../config/logger');

/**
 * Middleware para validar esquemas de express-validator
 * Si existen errores de validación, lanza un error 400
 */
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => `${err.path}: ${err.msg}`).join(', ');
        logger.warn(`Validación fallida: ${errorMessages}`);
        return next(new AppError(`Errores de validación: ${errorMessages}`, 400));
    }
    
    next();
};

module.exports = {
    validateRequest
};
