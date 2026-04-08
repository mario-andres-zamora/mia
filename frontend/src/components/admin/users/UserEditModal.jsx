import React from 'react';
import { User, X, ShieldCheck, Activity, Building2, RefreshCcw, Briefcase, ChevronRight } from 'lucide-react';

export default function UserEditModal({ user, departments, isOpen, onClose, onUpdate, onSave, onSync }) {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
            <div className="card w-full max-w-xl p-0 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-white/10 rounded-[3rem] text-left">
                <div className="p-10 border-b border-white/5 bg-gradient-to-br from-slate-900 to-slate-950 flex justify-between items-center relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-bl-full blur-[60px]"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-800 border border-white/5 rounded-3xl flex items-center justify-center text-gray-500 shadow-2xl">
                            <User className="w-8 h-8" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Modificar <span className="text-primary-400">Funcionario</span></h2>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 text-left">{user.first_name} {user.last_name}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-gray-500 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-10 space-y-8 bg-slate-900/50">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2 text-left block">
                                <ShieldCheck className="w-3 h-3 text-primary-500" /> Rol en Sistema
                            </label>
                            <select
                                name="role"
                                value={user.role}
                                onChange={(e) => onUpdate({ ...user, role: e.target.value })}
                                className="w-full bg-slate-950 border border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-white font-black focus:outline-none focus:border-primary-500 appearance-none cursor-pointer shadow-inner uppercase tracking-wider"
                            >
                                <option value="student">Usuario (Funcionario)</option>
                                <option value="admin">Administrador (TI/Seguridad)</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2 text-left block">
                                <Activity className="w-3 h-3 text-emerald-500" /> Estado Maestro
                            </label>
                            <select
                                name="is_active"
                                value={user.is_active}
                                onChange={(e) => onUpdate({ ...user, is_active: e.target.value === 'true' || e.target.value === '1' })}
                                className="w-full bg-slate-950 border border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-white font-black focus:outline-none focus:border-primary-500 appearance-none cursor-pointer shadow-inner uppercase tracking-wider"
                            >
                                <option value="true">ACCESO PERMITIDO</option>
                                <option value="false">ACCESO DENEGADO</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2 text-left block">
                                <Building2 className="w-3 h-3 text-secondary-500" /> Unidad Administrativa
                            </label>
                            <button
                                onClick={onSync}
                                className="text-[9px] font-black text-primary-400 hover:text-primary-300 uppercase tracking-widest flex items-center gap-2 transition-colors"
                            >
                                <RefreshCcw className="w-3 h-3" /> SINCRONIZAR DIRECTORIO
                            </button>
                        </div>
                        <div className="relative">
                            <select
                                name="department"
                                value={user.department || ''}
                                onChange={(e) => onUpdate({ ...user, department: e.target.value })}
                                className="w-full bg-slate-950 border border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-white font-black focus:outline-none focus:border-primary-500 appearance-none shadow-inner uppercase tracking-wider"
                            >
                                <option value="">Seleccionar área oficial...</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                                ))}
                            </select>
                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none rotate-90" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-1 flex items-center gap-2 text-left block">
                            <Briefcase className="w-3 h-3 text-primary-500" /> Cargo / Denominación
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={user.position || ''}
                            onChange={(e) => onUpdate({ ...user, position: e.target.value })}
                            className="w-full bg-slate-950 border border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-white font-black focus:outline-none focus:border-primary-500 shadow-inner uppercase tracking-widest placeholder:text-gray-800"
                            placeholder="EJ: AUDITOR SUPERIOR A"
                        />
                    </div>
                </div>

                <footer className="p-10 bg-slate-950 border-t border-white/5 flex gap-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors border border-transparent hover:border-white/5"
                    >
                        ABORTAR
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 py-5 bg-primary-500 rounded-[1.5rem] text-xs font-black uppercase tracking-widest text-white shadow-2xl shadow-primary-500/20 hover:bg-primary-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        <ShieldCheck className="w-5 h-5" /> ACTUALIZAR REGISTRO
                    </button>
                </footer>
            </div>
        </div>
    );
}
