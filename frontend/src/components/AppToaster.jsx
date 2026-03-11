import React from 'react';
import { Toaster } from 'react-hot-toast';
import CyberCat from './CyberCat';

/**
 * Componente que encapsula la configuración de notificaciones premium de la plataforma.
 * Incluye el diseño de burbuja de diálogo estilo cómic y la integración con CyberCat.
 */
export default function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 5000,
        className: 'comic-bubble-toast animate-comic-pop',
        style: {
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          padding: 0,
        },
        success: {
          icon: <CyberCat className="w-24 h-24" variant="success" color="#22c55e" showMedal={true} />,
          className: 'comic-bubble-toast animate-comic-pop comic-bubble-success',
        },
        error: {
          icon: <CyberCat className="w-24 h-24" variant="panic" color="#ef4444" />,
          className: 'comic-bubble-toast animate-comic-pop comic-bubble-error',
        },
      }}
    >
      {(t) => (
        <div 
          className={`${t.className} flex items-center`}
          style={{ opacity: t.visible ? 1 : 0, transition: 'opacity 0.2s' }}
        >
          {t.icon}
          <div className={`comic-bubble-content ${t.type === 'success' ? 'comic-bubble-success' : t.type === 'error' ? 'comic-bubble-error' : ''}`}>
            {t.message}
          </div>
        </div>
      )}
    </Toaster>
  );
}
