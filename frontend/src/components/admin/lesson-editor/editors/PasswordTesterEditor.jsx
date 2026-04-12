import React from 'react';

export default function PasswordTesterEditor({ formData, setFormData }) {
    return (
        <div className="space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 space-y-4">
                <h4 className="text-xs font-black text-pink-500 uppercase tracking-widest flex items-center gap-2">
                    Configuración del Medidor de Contraseña
                </h4>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Título del Test
                        </label>
                        <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pink-500/50 outline-none transition-all"
                            placeholder="Ej: Prueba tu contraseña"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Consejo / Tip (HTML soportado)
                        </label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pink-500/50 outline-none transition-all min-h-[100px]"
                            placeholder="Ej: Tip: No uses sustituciones comunes como 'a' por '4'..."
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-pink-500/5 border border-pink-500/10 rounded-2xl">
                <p className="text-[10px] text-pink-400 font-medium leading-relaxed">
                    <span className="font-bold uppercase tracking-widest mr-2 underline">Funcionamiento:</span>
                    Este componente presentará un campo interactivo donde el usuario podrá probar la fuerza de una contraseña localmente. La validación se realiza en tiempo real y muestra el tiempo estimado para descifrarla.
                </p>
            </div>
        </div>
    );
}
