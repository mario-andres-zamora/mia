const badgeService = require('../services/badgeService');
const logger = require('../config/logger');

class BadgeController {
    async getAllBadges(req, res) {
        try {
            const badges = await badgeService.getAllBadges();
            res.json({ success: true, badges });
        } catch (error) {
            logger.error('Error al obtener insignias:', error);
            res.status(500).json({ error: 'Error al obtener las insignias' });
        }
    }

    async createBadge(req, res) {
        try {
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({ error: 'Nombre y descripción son obligatorios' });
            }

            const badgeId = await badgeService.createBadge(req.body);
            res.json({ success: true, message: 'Insignia creada correctamente', badgeId });
        } catch (error) {
            logger.error('Error al crear insignia:', error);
            res.status(500).json({ error: 'Error al crear la insignia' });
        }
    }

    async updateBadge(req, res) {
        try {
            const { id } = req.params;
            const result = await badgeService.updateBadge(id, req.body);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Insignia no encontrada' });
            }
            
            res.json({ success: true, message: 'Insignia actualizada correctamente' });
        } catch (error) {
            logger.error('Error al actualizar insignia:', error);
            res.status(500).json({ error: 'Error al actualizar la insignia' });
        }
    }

    async deleteBadge(req, res) {
        try {
            const { id } = req.params;
            const result = await badgeService.deleteBadge(id);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Insignia no encontrada' });
            }
            
            res.json({ success: true, message: 'Insignia eliminada correctamente' });
        } catch (error) {
            logger.error('Error al eliminar insignia:', error);
            res.status(500).json({ error: 'Error al eliminar la insignia' });
        }
    }

    async getUserBadges(req, res) {
        try {
            const { userId } = req.params;
            const badges = await badgeService.getUserBadges(userId);
            res.json({ success: true, badges });
        } catch (error) {
            logger.error('Error al obtener insignias del usuario:', error);
            res.status(500).json({ error: 'Error al obtener las insignias del usuario' });
        }
    }

    async awardBadge(req, res) {
        try {
            const { userId, badgeId } = req.body;
            if (!userId || !badgeId) {
                return res.status(400).json({ error: 'Usuario e insignia son obligatorios' });
            }

            await badgeService.awardBadge(userId, badgeId);
            res.json({ success: true, message: 'Insignia asignada correctamente' });
        } catch (error) {
            logger.error('Error al asignar insignia:', error);
            res.status(500).json({ error: 'Error al asignar la insignia' });
        }
    }
}

module.exports = new BadgeController();
