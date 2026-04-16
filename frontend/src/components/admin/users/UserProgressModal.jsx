import React from 'react';
import { X, BookOpen, CheckCircle2, Circle, Clock, Award, BarChart3, ChevronRight, Activity } from 'lucide-react';

export default function UserProgressModal({ isOpen, onClose, user, progress }) {
    if (!isOpen || !user) return null;

    const detailedProgress = progress?.detailed || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
                
                {/* Header Decoration */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none"></div>

                {/* Header */}
                <div className="relative p-8 pb-4 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                            <BarChart3 className="w-7 h-7 text-primary-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Monitoreo de Avance</h3>
                                <div className="px-2 py-0.5 bg-primary-500/10 border border-primary-500/20 rounded-md text-[9px] font-black text-primary-400 uppercase tracking-widest">
                                    Auditoría Real
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 font-bold mt-1">
                                {user.first_name} {user.last_name} · <span className="text-primary-400/80">{user.department}</span>
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 flex items-center justify-center transition-all hover:rotate-90"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Summary Section */}
                <div className="relative px-8 py-6 bg-white/[0.02] border-b border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Estado Académico</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-white leading-none">{progress?.percentage || 0}%</span>
                                <span className="text-xs font-bold text-gray-600 uppercase">Completado</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Módulos Aprobados</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-emerald-400 leading-none">{progress?.completed || 0}</span>
                                <span className="text-xs font-bold text-gray-600 uppercase">de {progress?.total || 0}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Puntos Totales</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-yellow-500 leading-none">{user.points || 0}</span>
                                <span className="text-xs font-bold text-gray-600 uppercase">PTS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modules List */}
                <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-4 custom-scrollbar">
                    <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" /> Desglose por Módulo
                    </h4>

                    {detailedProgress.length > 0 ? (
                        detailedProgress.map((module, idx) => {
                            const isCompleted = module.completionPercentage === 100;
                            return (
                                <div 
                                    key={module.id} 
                                    className={`group relative p-5 rounded-3xl border transition-all duration-300 ${
                                        isCompleted 
                                        ? 'bg-emerald-500/[0.03] border-emerald-500/20 shadow-lg shadow-emerald-500/5' 
                                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all group-hover:rotate-3 ${
                                                isCompleted 
                                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                                                : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                                            }`}>
                                                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-primary-400/60 uppercase tracking-widest leading-none mb-1">Módulo {idx + 1}</p>
                                                <h5 className="font-black text-white text-sm uppercase tracking-tight">{module.title}</h5>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-lg font-black leading-none ${isCompleted ? 'text-emerald-400' : 'text-white'}`}>
                                                {module.completionPercentage}%
                                            </span>
                                            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter mt-1">Completado</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar Body */}
                                    <div className="relative h-2 w-full bg-black/40 rounded-full border border-white/5 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                                                isCompleted ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-primary-600'
                                            }`}
                                            style={{ width: `${module.completionPercentage}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Detailed breakdown info if available */}
                                    {module.userProgress && (
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-500 uppercase tracking-wider">
                                                <Clock className="w-3 h-3" /> {module.userProgress.completed_lessons} / {module.total_lessons} Lecciones
                                            </div>
                                            {module.total_quizzes > 0 && (
                                                <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-500 uppercase tracking-wider">
                                                    <Award className="w-3 h-3" /> {module.userProgress.completed_quizzes} / {module.total_quizzes} Quizzes
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 opacity-40">
                            <Activity className="w-12 h-12 mb-4 animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No hay datos de módulos registrados</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-slate-900/40 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95"
                    >
                        Cerrar Monitor
                    </button>
                </div>
            </div>
        </div>
    );
}
