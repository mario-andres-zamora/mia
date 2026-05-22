const axios = require('axios');
const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');

/**
 * Descarga una imagen desde una URL y la guarda localmente
 * @param {string} url - URL de la imagen de Google
 * @param {string} userId - ID del usuario para el nombre del archivo
 * @returns {Promise<string|null>} - Ruta local de la imagen o null si falla
 */
async function downloadProfilePicture(url, userId) {
    if (!url) return null;

    try {
        const directory = path.join(__dirname, '../uploads/profiles');
        
        // Asegurar que el directorio existe
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const filename = `profile_${userId}.jpg`;
        const filePath = path.join(directory, filename);
        const publicPath = `/uploads/profiles/${filename}`;

        // Descargar la imagen
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        // Guardar el archivo
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(publicPath));
            writer.on('error', (err) => {
                logger.error(`Error escribiendo archivo de perfil: ${err.message}`);
                resolve(null); // Fallback a null en caso de error de escritura
            });
        });

    } catch (error) {
        logger.error(`Error descargando foto de perfil de Google: ${error.message}`);
        return null;
    }
}

module.exports = {
    downloadProfilePicture
};
