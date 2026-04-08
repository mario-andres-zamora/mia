import React from 'react';
import { Shuffle } from 'lucide-react';

export default function QuizBasicSettings({ quiz, onUpdate }) {
    if (!quiz) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-900/30 rounded-2xl border border-white/5 border-dashed text-left">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left block">Título del Quiz</label>
                <input
                    type="text"
                    className="input-field bg-slate-950/50 border-white/10"
                    value={quiz.title || ''}
                    onChange={e => onUpdate({ ...quiz, title: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left block">Nota Mínima (%)</label>
                <input
                    type="number"
                    className="input-field bg-slate-950/50 border-white/10"
                    value={quiz.passing_score || 0}
                    onChange={e => onUpdate({ ...quiz, passing_score: parseInt(e.target.value) })}
                />
            </div>
            <div className="md:col-span-3 space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left block">Instrucciones / Descripción</label>
                <textarea
                    rows="3"
                    className="input-field bg-slate-950/50 border-white/10 text-sm italic"
                    placeholder="Ej: Responda todas las preguntas con atención para aprobar..."
                    value={quiz.description || ''}
                    onChange={e => onUpdate({ ...quiz, description: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left block">Intentos Máximos</label>
                <input
                    type="number"
                    className="input-field bg-slate-950/50 border-white/10"
                    value={quiz.max_attempts || 0}
                    onChange={e => onUpdate({ ...quiz, max_attempts: parseInt(e.target.value) })}
                />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-left block">Orden de Respuestas</label>
                <button
                    onClick={() => onUpdate({ ...quiz, randomize_options: !quiz.randomize_options })}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${quiz.randomize_options ? 'bg-primary-500/10 border-primary-500/30 text-primary-400' : 'bg-slate-950/50 border-white/10 text-gray-500'}`}
                >
                    <span className="text-xs font-bold">{quiz.randomize_options ? 'Aleatorio' : 'Fijo (por orden)'}</span>
                    <Shuffle className={`w-4 h-4 ${quiz.randomize_options ? 'animate-pulse' : ''}`} />
                </button>
            </div>
        </div>
    );
}
