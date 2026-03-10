const mysql = require('mysql2/promise');
const logger = require('./logger');

// Pool de conexiones para mejor rendimiento con 700 usuarios
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'cgr_user',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'cgr_lms',
    waitForConnections: true,
    connectionLimit: 50, // Suficiente para 700 usuarios concurrentes
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset: 'utf8mb4',
    timezone: '-06:00' // Costa Rica timezone
});

// Test de conexión con reintentos para soportar healthchecks de Docker
const testConnection = async (retries = 5, delay = 5000) => {
    while (retries > 0) {
        try {
            const connection = await pool.getConnection();
            logger.info('✅ Conexión a MariaDB establecida correctamente');
            connection.release();
            return;
        } catch (err) {
            logger.error(`❌ Error conectando a MariaDB. Intentos restantes: ${retries - 1}`, err);
            retries -= 1;
            if (retries === 0) {
                logger.error('❌ Fallo crítico de conexión a base de datos. Saliendo...');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

testConnection();

// Helper para ejecutar queries
const query = async (sql, params) => {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        logger.error('Database query error:', error);
        throw error;
    }
};

module.exports = {
    pool,
    query
};
