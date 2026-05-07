import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ForumInput({ 
    onSubmit, 
    placeholder = "Escribe tu mensaje...", 
    buttonText = "Publicar",
    onCancel = null,
    autoFocus = false
}) {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!message.trim()) {
            setError('El mensaje no puede estar vacío.');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        
        const result = await onSubmit(message);
        
        setIsSubmitting(false);
        
        if (result && result.success) {
            setMessage('');
            if (onCancel) onCancel(); // Close input if it was a reply form
        } else {
            setError(result?.error || 'Ocurrió un error inesperado.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full animate-fade-in">
            <div className="relative">
                <textarea
                    autoFocus={autoFocus}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        if (error) setError(null);
                    }}
                    placeholder={placeholder}
                    className={`w-full bg-slate-900/50 border rounded-xl py-3 px-4 text-white text-sm outline-none transition-all resize-none min-h-[100px] custom-scrollbar
                        ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-primary-500/50 hover:border-white/10'}`}
                />
                {error && (
                    <p className="text-red-400 text-xs font-medium mt-1 ml-1">{error}</p>
                )}
            </div>
            
            <div className="flex justify-end gap-2">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-95"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            {buttonText}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
