const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

async function migrate() {
    console.log('🔄 Actualizando tabla user_content_progress para guardar respuestas...');
    
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'mariadb',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'cgr_user',
        password: process.env.DB_PASSWORD || 'cgr_password_2026',
        database: process.env.DB_NAME || 'cgr_lms'
    });

    try {
        await connection.execute(`
            ALTER TABLE user_content_progress 
            ADD COLUMN response_data JSON COMMENT 'Guarda la opción seleccionada u otros datos de interacción'
            AFTER content_id;
        `);
        
        console.log('✅ Columna response_data añadida a user_content_progress.');
        
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('ℹ️ La columna response_data ya existe.');
        } else {
            console.error('❌ Error en la migración:', error);
            process.exit(1);
        }
    } finally {
        await connection.end();
    }
}

migrate();
