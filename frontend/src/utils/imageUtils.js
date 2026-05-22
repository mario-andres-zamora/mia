const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Procesa una URL de archivo (imagen, pdf, etc) para asegurar que sea válida, 
 * manejando tanto URLs externas como rutas locales del servidor.
 * @param {string} url - URL original
 * @param {string} fallbackName - Nombre para generar avatar de respaldo si la URL es nula (opcional)
 * @returns {string} - URL final procesada
 */
export const getFileUrl = (url, fallbackName = '') => {
    if (!url) {
        if (fallbackName) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=384A99&color=fff`;
        }
        return '#';
    }

    // Si la URL ya es absoluta (empieza por http)
    if (url.startsWith('http')) {
        return url;
    }

    // Si es una ruta local que empieza por /uploads
    // NOTA: No añadimos API_URL aquí porque tanto Nginx (prod) como Vite (dev) 
    // están configurados para interceptar /uploads y redirigirlos al backend 
    // de forma independiente al prefijo /api.
    if (url.startsWith('/uploads')) {
        return url;
    }

    // Si por alguna razón la URL ya tiene el prefijo de la API
    if (API_URL && url.startsWith(API_URL)) {
        return url;
    }

    // Fallback: si no empieza por / ni http, asumimos que necesita el prefijo de API
    if (!url.startsWith('/')) {
        const base = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
        return `${base}${url}`;
    }

    return url;
};

// Alias para mantener compatibilidad
export const getProfilePictureUrl = getFileUrl;
