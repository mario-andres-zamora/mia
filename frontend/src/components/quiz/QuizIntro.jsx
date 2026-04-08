import React from 'react';
import { ArrowLeft, Target, Award, CheckCircle2, ChevronRight } from 'lucide-react';

export default function QuizIntro({ quiz, totalPoints, questionsCount, onStart, onBack }) {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 space-y-8 animate-fade-in py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4" /> Cancelar y Volver
                    </button>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tight leading-none text-left">
                        {quiz.title}
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                </div>

                <div className="card p-10 space-y-8 border-primary-500/20 shadow-2xl shadow-primary-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-bl-full blur-3xl"></div>

                    <div className="relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-500/10 rounded-full border border-secondary-500/20">
                            <Target className="w-4 h-4 text-secondary-500" />
                            <span className="text-[10px] font-black text-secondary-400 uppercase tracking-widest">Instrucciones de Evaluación</span>
                        </div>

                        <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-primary-500/40 pl-8 py-2 text-left">
                            {quiz.description || 'Por favor, lea con atención y seleccione la respuesta correcta para cada cuestionamiento.'}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4 text-gray-400">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                    <Award className="w-6 h-6 text-primary-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Puntos Disponibles</p>
                                    <p className="text-lg font-bold text-white">{totalPoints} PTS</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-400">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nota de Aprobación</p>
                                    <p className="text-lg font-bold text-white">{quiz.passing_score}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-400">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                    <Award className="w-6 h-6 text-secondary-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Contenido</p>
                                    <p className="text-lg font-bold text-white">{questionsCount} preguntas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <button
                        onClick={onStart}
                        className="px-12 py-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:from-orange-500 hover:to-orange-400 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-orange-500/40 group flex items-center gap-3"
                    >
                        Iniciar Evaluación <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
