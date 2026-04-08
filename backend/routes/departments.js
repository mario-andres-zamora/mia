const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

/**
 * @route   GET /api/departments
 * @desc    Obtener lista de departamentos (Para selectores o gestión)
 * @access  Private
 */
router.get('/', authMiddleware, departmentController.getAllDepartments);

/**
 * @route   POST /api/departments
 * @desc    Crear nuevo departamento
 * @access  Private/Admin
 */
router.post('/', authMiddleware, adminMiddleware, departmentController.createDepartment);

/**
 * @route   PUT /api/departments/:id
 * @desc    Actualizar nombre de departamento
 * @access  Private/Admin
 */
router.put('/:id', authMiddleware, adminMiddleware, departmentController.updateDepartment);

/**
 * @route   DELETE /api/departments/:id
 * @desc    Eliminar departamento
 * @access  Private/Admin
 */
router.delete('/:id', authMiddleware, adminMiddleware, departmentController.deleteDepartment);

/**
 * @route   POST /api/departments/sync
 * @desc    Sincronizar departamentos desde el directorio maestro
 * @access  Private/Admin
 */
router.post('/sync', authMiddleware, adminMiddleware, departmentController.syncFromDirectory);

/**
 * @route   POST /api/departments/delete-all
 * @desc    Eliminar todos los departamentos
 * @access  Private/Admin
 */
router.post('/delete-all', authMiddleware, adminMiddleware, departmentController.deleteAllDepartments);

module.exports = router;
