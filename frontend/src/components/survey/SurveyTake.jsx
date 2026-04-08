import React from 'react';
import { ArrowLeft, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import SurveyInputs from './SurveyInputs';

export default function SurveyTake({ 
    survey, 
    questions, 
    currentQuestionIndex, 
    answers, 
    onAnswerChange, 
    onNext, 
    onPrev, 
    onSubmit, 
    submitting, 
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
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest mb-1"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Salir de la encuesta
                    </button>
                    <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{survey.title}</h1>
                </div>
                <div className="text-left md:text-right">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Pregunta</p>
                    <p className="text-lg md:text-xl font-black text-white">{currentQuestionIndex + 1} <span className="text-gray-600">/ {questions.length}</span></p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Question Card */}
            <div className="card px-4 md:px-8 py-3 md:py-4 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full blur-2xl"></div>

                <div className="space-y-3 relative z-10">
                    <div className="flex flex-col gap-2">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-yellow-500/10 rounded-full border border-yellow-500/20 self-start">
                            <ClipboardList className="w-3 h-3 text-yellow-500" />
                            <span className="text-[8px] font-black text-yellow-400 uppercase tracking-widest">Formulario de retroalimentación</span>
                        </div>
                    </div>

                    <h2 className="text-sm md:text-base font-bold text-white leading-relaxed tracking-tight text-left">
                        {currentQuestion.question_text}
                        {currentQuestion.is_required && <span className="text-red-500 ml-1">*</span>}
                    </h2>
                </div>

                {/* Question Inputs */}
                <div className="mt-2 relative z-10">
                    <SurveyInputs 
                        question={currentQuestion}
                        answers={answers}
                        onAnswerChange={onAnswerChange}
                    />
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between py-6 mt-4 border-t border-white/5">
                <button
                    onClick={onPrev}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-slate-700 hover:border-yellow-500/50 transition-all disabled:opacity-0"
                >
                    <ChevronLeft className="w-5 h-5" /> Anterior
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                    <button
                        onClick={onSubmit}
                        disabled={submitting}
                        className="px-10 py-3.5 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:from-yellow-500 hover:to-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/20 disabled:opacity-50"
                    >
                        {submitting ? 'Enviando...' : 'Finalizar Encuesta'}
                    </button>
                ) : (
                    <button
                        onClick={onNext}
                        className="flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:from-yellow-500 hover:to-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/20 group"
                    >
                        Siguiente <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
            </div>
        </div>
    );
}
