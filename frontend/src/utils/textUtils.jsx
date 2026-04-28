import React from 'react';

/**
 * Detecta URLs en un texto y las convierte en etiquetas <a> con estilo premium.
 * Soporta enlaces http, https y www.
 * 
 * @param {string} text - El texto a procesar.
 * @returns {Array|string} - Un array de partes de texto y elementos React.
 */
export const linkify = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    // Regex para encontrar URLs (http, https, www)
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
        if (part.match(urlRegex)) {
            const href = part.startsWith('http') ? part : `https://${part}`;
            return (
                <a 
                    key={i} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary-400 hover:text-primary-300 underline underline-offset-4 decoration-primary-400/30 transition-all font-medium inline-flex items-center gap-1 group"
                >
                    {part}
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            );
        }
        return part;
    });
};
