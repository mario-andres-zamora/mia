import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundStore } from '../store/soundStore';

/**
 * Control de sonido simplificado que permite activar/desactivar 
 * el audio de la plataforma con un solo clic.
 */
const SoundControl = () => {
    const { isMuted, toggleMute } = useSoundStore();

    return (
        <button
            onClick={toggleMute}
            className={`p-2.5 rounded-2xl transition-all duration-300 flex items-center justify-center border group ${
                isMuted 
                    ? 'bg-slate-800/40 text-slate-500 border-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20' 
                    : 'bg-primary-500/10 text-primary-400 border-primary-500/20 hover:bg-primary-500/20 shadow-lg shadow-primary-900/20'
            }`}
            title={isMuted ? "Activar sonido" : "Silenciar"}
        >
            {isMuted ? (
                <VolumeX className="w-5 h-5 transition-transform group-hover:scale-110" />
            ) : (
                <Volume2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}
        </button>
    );
};

export default SoundControl;
