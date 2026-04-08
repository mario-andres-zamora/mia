import { Edit2, LayoutGrid, ChevronDown, CheckCircle2, Award, Target, MoreVertical, X } from 'lucide-react';

export default function ModuleModal({ 
    isOpen, 
    onClose, 
    editingModule, 
    formData, 
    setFormData, 
    onSave 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-3xl bg-slate-900 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 animate-shimmer"></div>
                
                <div className="p-10 border-b border-white/5 bg-slate-950/40">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-primary-500/20 rounded-[1.5rem] text-primary-400 border border-primary-500/20 shadow-xl shadow-primary-500/10">
                            <LayoutGrid className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tight leading-none mb-1">
                                {editingModule ? 'Propiedades del Módulo' : 'Configurar Nuevo Módulo'}
                            </h2>
                            <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em] italic">Base de Datos Educativa v2.0</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="ml-auto p-3 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all active:scale-90"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                <form onSubmit={onSave} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">ID Módulo (Núm)</label>
                            <input
                                type="number"
                                required
                                className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-4 px-6 text-white text-lg font-black placeholder-gray-800 outline-none transition-all shadow-inner hover:border-white/20"
                                value={formData.module_number}
                                onChange={(e) => setFormData({ ...formData, module_number: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Índice de Orden</label>
                            <input
                                type="number"
                                required
                                className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-4 px-6 text-white text-lg font-black placeholder-gray-800 outline-none transition-all shadow-inner hover:border-white/20"
                                value={formData.order_index}
                                onChange={(e) => setFormData({ ...formData, order_index: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Título Académico Estratégico</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-5 px-6 text-xl font-bold text-white outline-none transition-all shadow-inner hover:border-white/20 placeholder-gray-800"
                            placeholder="Ej: Fundamentos de Ciberseguridad Avanzada..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Cuerpo del Programa (Resumen)</label>
                        <textarea
                            className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-[2rem] py-5 px-6 text-white outline-none transition-all min-h-[160px] shadow-inner hover:border-white/20 placeholder-gray-800 font-medium leading-relaxed"
                            placeholder="Describe detalladamente los objetivos tácticos de este módulo..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Fecha de Lanzamiento</label>
                            <input
                                type="date"
                                required
                                className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-4 px-6 text-white font-black outline-none transition-all shadow-inner hover:border-white/20"
                                value={formData.release_date}
                                onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Mes Académico</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-4 px-6 text-white font-black placeholder-gray-800 outline-none transition-all shadow-inner hover:border-white/20"
                                placeholder="Ej: Marzo 2024"
                                value={formData.month}
                                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2 italic">Referencia Visual (Banner)</label>
                        <input
                            type="text"
                            className="w-full bg-slate-950/80 border border-white/10 focus:border-primary-500/50 rounded-2xl py-4 px-6 text-white font-black placeholder-gray-800 outline-none transition-all shadow-inner hover:border-white/20"
                            placeholder="URL de imagen banner alta definición..."
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-wrap gap-8 pt-6 p-6 bg-slate-950/40 rounded-[2.5rem] border border-white/5">
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.generates_certificate}
                                onChange={(e) => setFormData({ ...formData, generates_certificate: e.target.checked })}
                            />
                            <div className={`w-14 h-7 rounded-full relative transition-all shadow-inner border border-white/5 ${formData.generates_certificate ? 'bg-primary-500 shadow-primary-500/30' : 'bg-slate-800'}`}>
                                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all shadow-2xl ${formData.generates_certificate ? 'left-7.5' : 'left-0.5'}`}></div>
                            </div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover:text-primary-400 transition-colors italic">Emite Certificación</span>
                        </label>

                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.requires_previous}
                                onChange={(e) => setFormData({ ...formData, requires_previous: e.target.checked })}
                            />
                            <div className={`w-14 h-7 rounded-full relative transition-all shadow-inner border border-white/5 ${formData.requires_previous ? 'bg-secondary-500 shadow-secondary-500/30' : 'bg-slate-800'}`}>
                                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all shadow-2xl ${formData.requires_previous ? 'left-7.5' : 'left-0.5'}`}></div>
                            </div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover:text-secondary-400 transition-colors italic">Bloqueo Secuencial</span>
                        </label>
                        
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.is_published}
                                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                            />
                            <div className={`w-14 h-7 rounded-full relative transition-all shadow-inner border border-white/5 ${formData.is_published ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-slate-800'}`}>
                                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all shadow-2xl ${formData.is_published ? 'left-7.5' : 'left-0.5'}`}></div>
                            </div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors italic">Activar Publicación</span>
                        </label>
                    </div>

                    <div className="flex gap-6 pt-10 border-t border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-5 px-8 bg-slate-950 hover:bg-slate-800 text-gray-500 hover:text-white font-black uppercase tracking-[0.3em] rounded-2xl border border-white/5 transition-all text-[11px] shadow-xl active:scale-95"
                        >
                            DESCARTAR
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-5 px-8 bg-primary-600 hover:bg-primary-500 text-white font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-2xl shadow-primary-600/30 active:scale-95 text-[11px] border border-primary-500/20"
                        >
                            {editingModule ? 'GUARDAR CAMBIOS' : 'INSTANCIAR MÓDULO'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
