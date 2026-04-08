import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function SurveyInputs({ question, answers, onAnswerChange }) {
    const questionId = question.id;
    const currentAnswer = answers[questionId];

    if (question.question_type === 'multiple_choice') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onAnswerChange(questionId, option.id, 'multiple_choice')}
                        className={`w-full p-4 md:p-6 text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between ${currentAnswer?.optionId === option.id
                            ? 'bg-yellow-500/10 border-yellow-500 text-white shadow-[0_0_30px_rgba(234,179,8,0.15)]'
                            : 'bg-slate-900/50 border-white/5 text-gray-400 hover:border-white/10 hover:bg-slate-900'
                            }`}
                    >
                        <span className="text-sm md:text-base font-bold">{option.option_text}</span>
                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all ${currentAnswer?.optionId === option.id
                            ? 'border-yellow-400 bg-yellow-400'
                            : 'border-gray-700'
                            }`}>
                            {currentAnswer?.optionId === option.id && <div className="w-2 h-2 bg-black rounded-full"></div>}
                        </div>
                    </button>
                ))}
            </div>
        );
    }

    if (question.question_type === 'rating') {
        return (
            <div className="flex flex-col items-center gap-8 py-10">
                <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            onClick={() => onAnswerChange(questionId, n, 'rating')}
                            className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl border-2 font-black text-xl md:text-3xl transition-all shadow-xl ${currentAnswer?.text === n.toString()
                                ? 'bg-yellow-500 text-black border-yellow-400 scale-110'
                                : 'bg-slate-900/50 border-white/5 text-gray-500 hover:border-yellow-500/50 hover:text-yellow-500'
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between w-full max-w-sm text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <span>Muy Insatisfecho</span>
                    <span>Muy Satisfecho</span>
                </div>
            </div>
        );
    }

    if (question.question_type === 'text') {
        return (
            <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Tu Comentario
                </label>
                <textarea
                    rows="6"
                    className="w-full bg-slate-900/50 border-2 border-white/5 rounded-2xl p-6 text-white placeholder:text-gray-700 focus:border-yellow-500/50 transition-all outline-none"
                    placeholder="Escribe aquí tu respuesta..."
                    value={currentAnswer?.text || ''}
                    onChange={(e) => onAnswerChange(questionId, e.target.value, 'text')}
                />
            </div>
        );
    }

    return null;
}
