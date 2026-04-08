const departmentService = require('../services/departmentService');
const logger = require('../config/logger');

class DepartmentController {
    async getAllDepartments(req, res) {
        try {
            const departments = await departmentService.getAllDepartments();
            res.json({ success: true, departments });
        } catch (error) {
            logger.error('Error al obtener departamentos:', error);
            res.status(500).json({ error: 'Error al cargar los departamentos' });
        }
    }

    async createDepartment(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            const department = await departmentService.createDepartment(name);
            res.status(201).json({ success: true, ...department });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El departamento ya existe' });
            }
            logger.error('Error al crear departamento:', error);
            res.status(500).json({ error: 'Error al crear el departamento' });
        }
    }

    async updateDepartment(req, res) {
        try {
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res.status(400).json({ error: 'El nombre es requerido' });
            }

            await departmentService.updateDepartment(id, name);
            res.json({ success: true, message: 'Departamento actualizado correctamente' });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Ya existe otro departamento con ese nombre' });
            }
            logger.error('Error al actualizar departamento:', error);
            res.status(500).json({ error: 'Error al actualizar el departamento' });
        }
    }

    async deleteDepartment(req, res) {
        try {
            const { id } = req.params;
            await departmentService.deleteDepartment(id);
            res.json({ success: true, message: 'Departamento eliminado correctamente' });
        } catch (error) {
            logger.error('Error al eliminar departamento:', error);
            res.status(500).json({ error: 'Error al eliminar el departamento' });
        }
    }

    async syncFromDirectory(req, res) {
        try {
            const insertedCount = await departmentService.syncFromDirectory();
            res.json({ 
                success: true, 
                message: `Sincronización completada. ${insertedCount} nuevas áreas agregadas desde el directorio maestro.` 
            });
        } catch (error) {
            logger.error('Error al sincronizar departamentos:', error);
            res.status(500).json({ error: 'Error al sincronizar con el directorio maestro' });
        }
    }

    async deleteAllDepartments(req, res) {
        try {
            await departmentService.deleteAllDepartments();
            res.json({ success: true, message: 'Todas las áreas han sido eliminadas' });
        } catch (error) {
            logger.error('Error al eliminar todas las áreas:', error);
            res.status(500).json({ error: 'Error al eliminar las áreas' });
        }
    }
}

module.exports = new DepartmentController();
