import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function MultipleChoiceEditor({ formData, setFormData }) {
    const options = formData.options || [];

    const handleAddOption = () => {
        const newOptions = [...options, { text: '', is_correct: false }];
        setFormData({ ...formData, options: newOptions });
    };

    const handleRemoveOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setFormData({ ...formData, options: newOptions });
    };

    const handleUpdateOption = (index, text) => {
        const newOptions = options.map((opt, i) => 
            i === index ? { ...opt, text } : opt
        );
        setFormData({ ...formData, options: newOptions });
    };

    const handleSetCorrect = (index) => {
        const newOptions = options.map((opt, i) => ({
            ...opt,
            is_correct: i === index
        }));
        setFormData({ ...formData, options: newOptions });
    };

    const toggleNoCorrectAnswer = () => {
        const newOptions = options.map(opt => ({ ...opt, is_correct: false }));
        setFormData({ ...formData, options: newOptions });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Pregunta / Instrucción */}
            <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Pregunta o Instrucción</label>
                <textarea
                    className="w-full bg-[#0a0d18] border border-white/5 focus:border-primary-500/50 rounded-xl py-3 px-4 text-white text-sm min-h-[100px] outline-none transition-all resize-none"
                    placeholder="Escribe la pregunta o instrucción aquí..."
                    value={formData.data || ''}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                />
            </div>

            {/* Opciones */}
            <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Opciones de Respuesta</label>
                    <button
                        type="button"
                        onClick={handleAddOption}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-400 hover:text-primary-300 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Añadir Opción
                    </button>
                </div>

                <div className="space-y-3">
                    {options.length === 0 && (
                        <div className="text-center py-8 bg-black/20 rounded-2xl border border-dashed border-white/5">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No hay opciones configuradas</p>
                        </div>
                    )}
                    
                    {options.map((option, index) => (
                        <div key={index} className="flex gap-3 items-center group">
                            <button
                                type="button"
                                onClick={() => handleSetCorrect(index)}
                                className={`shrink-0 p-2 rounded-lg transition-all ${option.is_correct ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-900 text-gray-600 border border-white/5 hover:border-white/10'}`}
                                title={option.is_correct ? 'Respuesta Correcta' : 'Marcar como correcta'}
                            >
                                {option.is_correct ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                            </button>
                            
                            <input
                                type="text"
                                className={`flex-1 bg-[#0a0d18] border rounded-xl py-3 px-4 text-white text-sm outline-none transition-all ${option.is_correct ? 'border-emerald-500/30 focus:border-emerald-500/50' : 'border-white/5 focus:border-primary-500/50'}`}
                                placeholder={`Opción ${index + 1}`}
                                value={option.text}
                                onChange={(e) => handleUpdateOption(index, e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => handleRemoveOption(index)}
                                className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {options.some(o => o.is_correct) && (
                    <button
                        type="button"
                        onClick={toggleNoCorrectAnswer}
                        className="text-[9px] font-bold text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest ml-1"
                    >
                        Limpiar respuesta correcta (Hacerlo solo de visualización)
                    </button>
                )}
            </div>

            <div className="p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10">
                <p className="text-[10px] text-primary-400/80 leading-relaxed font-medium italic">
                    <span className="font-bold">Nota:</span> Si marcas una respuesta como correcta, el sistema validará la elección del usuario. Si no marcas ninguna, funcionará como una encuesta simple dentro de la lección (reflexión).
                </p>
            </div>
        </div>
    );
}
