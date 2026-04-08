const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validator');

/**
 * @route   POST /api/auth/google
 * @desc    Autenticación con Google OAuth (Session based)
 * @access  Public
 */
router.post('/google', 
    [
        body('credential').notEmpty().withMessage('El token de credencial es requerido').isString()
    ], 
    validateRequest,
    authController.googleAuth
);

/**
 * @route   POST /api/auth/logout
 * @desc    Cerrar sesión
 * @access  Private
 */
router.post('/logout', authController.logout);

/**
 * @route   GET /api/auth/verify
 * @desc    Verificar sesión activa
 * @access  Private
 */
router.get('/verify', authController.verifySession);

module.exports = router;
