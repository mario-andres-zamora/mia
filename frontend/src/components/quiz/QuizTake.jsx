import React from 'react';
import { ArrowLeft, Target, ChevronLeft, ChevronRight } from 'lucide-react';

export default function QuizTake({ 
    quiz, 
    questions, 
    currentQuestionIndex, 
    answers, 
    onOptionSelect, 
    onNext, 
    onPrev, 
    onSubmit, 
    submitting, 
    attemptsMade, 
    onBack 
}) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-12 space-y-4 animate-fade-in pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Salir de la evaluación
                    </button>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">{quiz.title}</h1>
                </div>
                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Intento</p>
                        <p className="text-xl font-black text-white">{(attemptsMade || 0) + 1} <span className="text-gray-600">/ {quiz.max_attempts}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Pregunta</p>
                        <p className="text-xl font-black text-white">{currentQuestionIndex + 1} <span className="text-gray-600">/ {questions.length}</span></p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(56,74,153,0.5)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Question Card */}
            <div className="card px-4 md:px-8 py-3 md:py-4 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-bl-full blur-2xl"></div>

                <div className="space-y-3 relative z-10">
                    <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-secondary-500/10 rounded-full border border-secondary-500/20 self-start">
                            <Target className="w-3 h-3 text-secondary-500" />
                            <span className="text-[8px] font-black text-secondary-400 uppercase tracking-widest">Actividad de Evaluación</span>
                        </div>
                    </div>

                    {currentQuestion.image_url && (
                        <div className="w-full max-h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950/40 flex justify-center">
                            <img
                                src={currentQuestion.image_url}
                                alt="Contexto de la pregunta"
                                className="max-w-full max-h-96 object-contain"
                            />
                        </div>
                    )}
                    <h2 className="text-sm md:text-base font-bold text-white leading-relaxed tracking-tight text-left">
                        {currentQuestion.question_text}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 relative z-10">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => onOptionSelect(currentQuestion.id, option.id)}
                            className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 group flex items-center justify-between ${answers[currentQuestion.id] === option.id
                                ? 'bg-primary-500/10 border-primary-500 text-white shadow-[0_0_30px_rgba(56,74,153,0.2)]'
                                : 'bg-slate-900/50 border-white/5 text-gray-400 hover:border-white/10 hover:bg-slate-900 group'
                                }`}
                        >
                            <span className="font-bold">{option.option_text}</span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[currentQuestion.id] === option.id
                                ? 'border-primary-400 bg-primary-400'
                                : 'border-gray-700'
                                }`}>
                                {answers[currentQuestion.id] === option.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between py-6 mt-4 border-t border-white/5">
                <button
                    onClick={onPrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-slate-700 hover:border-orange-500/50 transition-all disabled:opacity-0"
                >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                    <button
                        onClick={onSubmit}
                        disabled={submitting}
                        className="px-10 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:from-orange-500 hover:to-orange-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50"
                    >
                        {submitting ? 'Calificando...' : 'Finalizar Evaluación'}
                    </button>
                ) : (
                    <button
                        onClick={onNext}
                        className="flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:from-orange-500 hover:to-orange-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20 group"
                    >
                        Siguiente <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>
        </div>
    );
}
