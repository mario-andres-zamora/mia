const db = require('../config/database');
const { syncAllUsersLevels } = require('../utils/gamification');
const logger = require('../config/logger');

async function runFix() {
    try {
        logger.info('--- INICIANDO SCRIPT DE CORRECCIÓN DE NIVELES ---');
        const results = await syncAllUsersLevels();
        logger.info(`--- PROCESO FINALIZADO ---`);
        logger.info(`Usuarios analizados: ${results.total}`);
        logger.info(`Usuarios actualizados: ${results.updated}`);
        process.exit(0);
    } catch (error) {
        logger.error('Error ejecutando script de corrección:', error);
        process.exit(1);
    }
}

runFix();
