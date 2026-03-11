import { useEffect, useRef } from 'react';
import toast, { useToasterStore } from 'react-hot-toast';

/**
 * Componente que escucha las notificaciones de toast y reproduce sonidos
 */
export default function ToastSoundEffect() {
    const { toasts } = useToasterStore();
    const lastPlayedId = useRef(null);

    useEffect(() => {
        // Encontrar el toast más reciente que acaba de aparecer
        const lastToast = toasts[toasts.length - 1];

        if (lastToast && lastToast.visible && lastPlayedId.current !== lastToast.id) {
            // Si el toast es de tipo error, reproducir gato-error.mp3
            if (lastToast.type === 'error') {
                const audio = new Audio('/gato-error.mp3');
                audio.volume = 0.5;
                audio.play().catch(err => console.log('Autoplay blocked or audio missing:', err));
                lastPlayedId.current = lastToast.id;
            }
        }
    }, [toasts]);

    return null;
}
