import React from 'react';
import CyberCat from '../CyberCat';

export default function ModuleErrorState({ error, module, onBack, onTogglePreview }) {
    const isLocked = error === 'Módulo bloqueado';

    return (
        <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6">
                <CyberCat className="w-full h-full" variant={isLocked ? "panic" : "normal"} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{error || 'Módulo no encontrado'}</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {isLocked 
                    ? (module?.lock_message || 'Debes completar el módulo anterior antes de poder acceder a este contenido.')
                    : 'El contenido solicitado no está disponible en este momento.'
                }
            </p>
            <div className="flex justify-center gap-4">
                {isLocked && (
                    <button onClick={onTogglePreview} className="btn-secondary">
                        Ver previsualización
                    </button>
                )}
                <button onClick={onBack} className="btn-primary">
                    Volver al catálogo
                </button>
            </div>
        </div>
    );
}
