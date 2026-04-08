import { Plus, X } from 'lucide-react';

export default function LessonModal({ 
    isOpen, 
    onClose, 
    editingLesson, 
    formData, 
    setFormData, 
    onSave 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-xl bg-slate-900 rounded-[3rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="p-10 border-b border-white/5 bg-slate-950/40">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-primary-500/20 rounded-[1.5rem] text-primary-400 border border-primary-500/20 shadow-xl shadow-primary-500/10 active:scale-95 transition-transform">
                            <Plus className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight leading-none mb-1">
                                {editingLesson ? 'Propiedades de Unidad' : 'Nueva Unidad Táctica'}
                            </h2>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Cuerpo Docente v1.0</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="ml-auto p-3 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all active:scale-90"
                        >
                            <X className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                <form onSubmit={onSave} className="p-10 space-y-8 bg-slate-900/50">
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Título de la Unidad Académica</label>
                        <input
                            type="text"
                            required
                            autoFocus
                            className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-5 px-6 text-white text-lg font-black placeholder-gray-800 outline-none transition-all shadow-inner hover:border-white/20"
                            placeholder="Ej: Análisis de Malware de Día Cero..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Metodología Especializada</label>
                            <div className="relative group/select">
                                <select
                                    className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-4 px-6 text-white font-black outline-none transition-all appearance-none cursor-pointer shadow-inner hover:border-white/20 italic"
                                    value={formData.lesson_type}
                                    onChange={(e) => setFormData({ ...formData, lesson_type: e.target.value })}
                                >
                                    <option value="reading">Lectura Estratégica</option>
                                    <option value="video">Laboratorio en Video</option>
                                    <option value="quiz">Evaluación de Campo</option>
                                    <option value="interactive">Ejercicio Interactivo</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 group-hover/select:text-primary-500 transition-colors">
                                    <X className="w-5 h-5 rotate-45" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Tiempo Est. (Min)</label>
                            <input
                                type="number"
                                required
                                className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-4 px-6 text-white text-lg font-black outline-none transition-all shadow-inner hover:border-white/20"
                                value={formData.duration_minutes}
                                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-6 pt-10 border-t border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-5 px-8 bg-slate-950 hover:bg-slate-800 text-gray-500 hover:text-white font-black uppercase tracking-[0.3em] rounded-2xl border border-white/5 transition-all text-[11px] shadow-xl active:scale-95"
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-5 px-8 bg-primary-600 hover:bg-primary-500 text-white font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-2xl shadow-primary-600/30 active:scale-95 text-[11px] border border-primary-500/20"
                        >
                            {editingLesson ? 'ACTUALIZAR UNIDAD' : 'SINCRONIZAR UNIDAD'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
