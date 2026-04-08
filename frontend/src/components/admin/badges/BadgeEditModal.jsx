import React from 'react';
import { Edit2, Plus, Info, Award, Shield, Star, Trophy, Crown, Target, Zap, Lock, ShieldCheck, Key, Bell } from 'lucide-react';

const icons = {
    Award, Shield, Star, Trophy, Crown, Target, Zap, Lock, ShieldCheck, Key, Bell
};

const criteriaOptions = [
    { value: 'manual', label: 'Asignación Manual', description: 'El administrador la otorga discrecionalmente.' },
    { value: 'module_completion', label: 'Completar Módulo', description: 'Se otorga al terminar un módulo específico.' },
    { value: 'quiz_score', label: 'Puntaje en Quiz', description: 'Se otorga al obtener una nota mínima.' },
    { value: 'total_points', label: 'Acumulación de Puntos', description: 'Se otorga al llegar a una meta de experiencia.' },
    { value: 'phishing_report', label: 'Reporte de Phishing', description: 'Se otorga por reportar simulacros.' }
];

export default function BadgeEditModal({ isOpen, onClose, editingBadge, formData, setFormData, onSave }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in text-left">
            <div className="card w-full max-w-2xl !p-0 overflow-hidden border-white/10 shadow-[0_0_100px_rgba(56,74,153,0.2)]">
                <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        {editingBadge ? <Edit2 className="w-6 h-6 text-primary-400" /> : <Plus className="w-6 h-6 text-primary-400" />}
                        {editingBadge ? 'Editar Insignia' : 'Nueva Insignia'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 text-left">Define cómo los funcionarios ganarán este reconocimiento.</p>
                </div>

                <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 block text-left">Nombre</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-primary-500 transition-all font-bold placeholder:text-gray-800"
                                placeholder="Ej: Defensor de Datos"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 block text-left">Icono</label>
                            <select
                                value={formData.icon_name}
                                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                                className="w-full px-5 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-primary-500 appearance-none cursor-pointer uppercase text-[10px] tracking-widest font-black"
                            >
                                {Object.keys(icons).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 block text-left">Descripción</label>
                        <textarea
                            rows="3"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-5 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-primary-500 transition-all resize-none font-bold placeholder:text-gray-800"
                            placeholder="Explica cómo se obtiene..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 text-left">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 block text-left">Criterio</label>
                            <select
                                value={formData.criteria_type}
                                onChange={(e) => setFormData({ ...formData, criteria_type: e.target.value })}
                                className="w-full px-5 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest focus:outline-none focus:border-primary-500 appearance-none cursor-pointer"
                            >
                                {criteriaOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                            <p className="text-[9px] text-gray-600 font-bold uppercase italic px-1 text-left">
                                {criteriaOptions.find(o => o.value === formData.criteria_type)?.description}
                            </p>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 block text-left">Valor Meta</label>
                            <input
                                type="text"
                                value={formData.criteria_value}
                                onChange={(e) => setFormData({ ...formData, criteria_value: e.target.value })}
                                className="w-full px-5 py-4 bg-slate-900 border border-white/10 rounded-2xl text-white font-bold focus:outline-none focus:border-primary-500 transition-all placeholder:text-gray-800"
                                placeholder="Ej: 85 o ID del módulo"
                            />
                            <p className="text-[9px] text-gray-600 font-bold uppercase italic px-1 flex items-center gap-1 text-left">
                                <Info className="w-3 h-3" /> Meta de puntos, ID o nota mínima.
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="p-10 bg-white/[0.02] border-t border-white/5 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 py-5 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-400 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        {editingBadge ? 'Guardar Cambios' : 'Crear Insignia'}
                    </button>
                </footer>
            </div>
        </div>
    );
}
