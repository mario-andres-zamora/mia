import React from 'react';
import { ClipboardList, FileText, XCircle, CheckCircle } from 'lucide-react';

export default function EvaluationModal({ gradingSubmission, gradeData, setGradeData, onClose, onSubmit, API_URL }) {
    if (!gradingSubmission) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in text-left">
            <div className="card w-full max-w-2xl bg-gradient-to-b from-[#1b2341] to-[#0a0f1e] border-slate-700/50 p-0 overflow-hidden shadow-[0_0_50px_-12px_rgba(30,58,138,0.5)] animate-fade-in-up">
                <div className="p-6 border-b border-white/5 bg-slate-900/50 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary-500/5 pointer-events-none"></div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-3 z-10 uppercase tracking-tight italic">
                        <div className="p-2 bg-pink-500/20 rounded-xl">
                            <ClipboardList className="w-5 h-5 text-pink-400" />
                        </div>
                        Revisar Tarea
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center z-10"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Student Info Card */}
                    <div className="flex gap-4 p-5 bg-slate-900/60 rounded-3xl border border-white/5 shadow-inner">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/30 to-secondary-500/10 flex items-center justify-center text-primary-300 font-black text-2xl uppercase shrink-0 border border-white/5 shadow-lg">
                            {gradingSubmission.first_name[0]}{gradingSubmission.last_name[0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-black text-xl tracking-tight leading-none mb-1 uppercase">{gradingSubmission.first_name} {gradingSubmission.last_name}</p>
                            <p className="text-gray-400 text-sm font-medium mb-3">{gradingSubmission.email}</p>
                            <div className="flex flex-wrap gap-2 justify-start">
                                <span className="text-[9px] text-primary-400 uppercase font-black bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/10">{gradingSubmission.module_title}</span>
                                <span className="text-[9px] text-gray-500 uppercase font-black bg-white/5 px-2 py-0.5 rounded border border-white/5">{gradingSubmission.lesson_title}</span>
                            </div>
                        </div>
                    </div>

                    {/* File Download / View Section */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest pl-1 block text-left">Documento Entregado</label>
                        <a
                            href={`${API_URL.replace('/api', '')}${gradingSubmission.file_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-5 bg-slate-800/40 rounded-3xl border border-white/10 hover:border-primary-500/50 hover:bg-slate-800/80 transition-all group active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform bg-gradient-to-br from-blue-500/30 to-blue-600/10">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-bold text-lg group-hover:text-primary-400 transition-colors uppercase">Abrir para Revisión</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Subido el {new Date(gradingSubmission.submitted_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-black bg-white/5 px-4 py-2 rounded-xl text-gray-400 uppercase tracking-widest border border-white/5 group-hover:bg-primary-500 group-hover:text-white transition-all">Ver PDF/Imagen</div>
                        </a>
                    </div>

                    {/* Feedback Form */}
                    <div className="space-y-6 pt-6 border-t border-white/5 text-left">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end pr-1">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest block text-left">Puntaje / Nota</label>
                                <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Base 100</span>
                            </div>
                            <input 
                                type="number" 
                                min="0" max="100"
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-xl text-center focus:outline-none focus:border-primary-500 transition-all"
                                value={gradeData.grade}
                                onChange={(e) => setGradeData({ ...gradeData, grade: parseInt(e.target.value) || 0 })}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest pl-1 block text-left">Observaciones</label>
                            <textarea
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold text-sm min-h-[120px] focus:outline-none focus:border-primary-500 transition-all resize-none placeholder:text-gray-800"
                                rows="3"
                                placeholder="Indica al estudiante qué puntos debe mejorar o las fortalezas de su trabajo..."
                                value={gradeData.feedback}
                                onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                            />
                        </div>

                        {gradingSubmission.status !== 'pending' && (
                            <div className="px-4 py-3 bg-yellow-500/5 rounded-2xl border border-yellow-500/10 flex items-center justify-between">
                                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">🚧 Esta tarea ya tiene calificación</p>
                                <span className="text-[10px] text-white font-black bg-yellow-500/20 px-3 py-1 rounded-full uppercase">{gradingSubmission.status === 'approved' ? 'Aprobado' : 'Rechazado'}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="p-8 bg-slate-900/80 border-t border-white/10 flex gap-4 backdrop-blur-sm">
                    <button
                        onClick={() => onSubmit('rejected')}
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-6 rounded-3xl font-black text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-inner active:scale-95 group"
                    >
                        <XCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] uppercase tracking-tighter">Rechazar Entrega</span>
                    </button>
                    <button
                        onClick={() => onSubmit('approved')}
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-6 rounded-3xl font-black text-green-500 bg-green-500/5 border border-green-500/10 hover:bg-green-500 hover:text-white transition-all shadow-xl active:scale-95 group shadow-green-500/5"
                    >
                        <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] uppercase tracking-tighter">Aprobar y Guardar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
