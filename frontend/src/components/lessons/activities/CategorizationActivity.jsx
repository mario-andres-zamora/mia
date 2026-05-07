import React, { useState } from 'react';
import { LayoutGrid, XCircle, AlertTriangle, Tag, CheckCircle2, Zap } from 'lucide-react';
import DOMPurify from 'dompurify';
import { linkify } from '../../../utils/textUtils';

export default function CategorizationActivity({ item, data, visitedLinks, markLinkAsVisited, playSuccess, playError }) {
    const isCompleted = visitedLinks.has(item.id);
    const interactionData = item.interactionData ? (typeof item.interactionData === 'string' ? JSON.parse(item.interactionData) : item.interactionData) : null;
    
    const categories = data.categories || [];
    const initialItems = data.items || [];
    
    const [placedItems, setPlacedItems] = useState(interactionData?.placedItems || {});
    const [feedback, setFeedback] = useState(interactionData?.feedback || null);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleDrop = (itemId, categoryId) => {
        if (isCompleted) return;
        setPlacedItems(prev => ({ ...prev, [itemId]: categoryId }));
        setFeedback(null);
    };

    const handleVerify = async () => {
        if (isCompleted || isVerifying) return;
        
        setIsVerifying(true);
        let allCorrect = true;
        let totalPlaced = Object.keys(placedItems).length;
        
        if (totalPlaced < initialItems.length) {
            allCorrect = false;
        } else {
            for (const itemObj of initialItems) {
                if (placedItems[itemObj.id] !== itemObj.categoryId) {
                    allCorrect = false;
                    break;
                }
            }
        }

        if (allCorrect) {
            setFeedback('success');
            playSuccess();
            await markLinkAsVisited(item.id, { 
                placedItems, 
                feedback: 'success',
                completed_at: new Date().toISOString()
            });
        } else {
            setFeedback('error');
            playError();
            setTimeout(() => setIsVerifying(false), 1000);
        }
    };

    const resetItem = (itemId) => {
        if (isCompleted) return;
        const newPlaced = { ...placedItems };
        delete newPlaced[itemId];
        setPlacedItems(newPlaced);
        setFeedback(null);
    };

    const unplacedItems = initialItems.filter(i => !placedItems[i.id]);

    return (
        <div className={`p-8 rounded-[2.5rem] transition-all duration-700 border-2 ${feedback === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/40 border-white/5'}`}>
            <div className="space-y-8">
                <div className="flex gap-4 items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${feedback === 'success' ? 'bg-emerald-500 text-white' : 'bg-primary-500/10 text-primary-400'}`}>
                        <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h3>
                        <div className="text-sm text-gray-400 font-medium italic mt-1">
                            {(() => {
                                const desc = data.description || data.instruction || data.text || 'Clasifica los siguientes conceptos en sus categorías correspondientes:';
                                const isHtml = /<[a-z][\s\S]*>/i.test(desc);
                                return isHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }} />
                                ) : (
                                    <p>{linkify(desc)}</p>
                                );
                            })()}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col h-full group/cat">
                            <div className="bg-slate-950/80 p-4 rounded-t-2xl border-x border-t border-white/10 flex items-center justify-between group-hover/cat:border-primary-500/30 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                    <span className="text-xs font-black text-white uppercase tracking-wider">{cat.label}</span>
                                </div>
                                {cat.sublabel && (
                                    <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] font-black text-gray-500 border border-white/5 uppercase">{cat.sublabel}</span>
                                )}
                            </div>
                            
                            <div 
                                className={`flex-1 min-h-[150px] p-4 bg-black/20 rounded-b-2xl border-x border-b border-white/5 transition-all flex flex-col gap-3 group-hover/cat:bg-black/30 ${feedback === 'error' ? 'border-red-500/20' : ''}`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const itemId = e.dataTransfer.getData("itemId");
                                    if (itemId) handleDrop(itemId, cat.id);
                                }}
                            >
                                {Object.entries(placedItems)
                                    .filter(([_, catId]) => catId === cat.id)
                                    .map(([itemId, _]) => {
                                        const itemObj = initialItems.find(i => i.id === itemId);
                                        const isCorrect = feedback === 'success' || (feedback === 'error' && itemObj.categoryId === cat.id);
                                        const isIncorrect = feedback === 'error' && itemObj.categoryId !== cat.id;

                                        return (
                                            <div 
                                                key={itemId}
                                                draggable={!isCompleted}
                                                onDragStart={(e) => e.dataTransfer.setData("itemId", itemId)}
                                                onClick={() => resetItem(itemId)}
                                                className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer select-none border-2 shadow-lg flex justify-between items-center group/item ${
                                                    isCorrect ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' :
                                                    isIncorrect ? 'bg-red-500/10 border-red-500/50 text-red-400 animate-shake' :
                                                    'bg-slate-800 border-white/10 text-gray-300 hover:border-primary-500/50'
                                                }`}
                                            >
                                                <span className="flex-1">{itemObj?.text}</span>
                                                {!isCompleted && <XCircle className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 text-gray-500 hover:text-white transition-all ml-2" />}
                                            </div>
                                        );
                                    })
                                }
                                {Object.values(placedItems).filter(v => v === cat.id).length === 0 && (
                                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
                                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Arrastra aquí</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {categories.length === 0 && (
                    <div className="py-12 bg-black/20 rounded-[2rem] border border-dashed border-white/5 flex flex-col items-center justify-center space-y-4">
                        <AlertTriangle className="w-8 h-8 text-yellow-500/50" />
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">No hay categorías configuradas para esta actividad</p>
                    </div>
                )}

                {!isCompleted && unplacedItems.length > 0 && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center gap-3 ml-1">
                            <Tag className="w-4 h-4 text-orange-400" />
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Banco de Conceptos:</label>
                        </div>
                        <div className="flex flex-wrap gap-3 p-6 bg-black/30 rounded-[2rem] border border-white/5 min-h-[100px] items-center justify-center">
                            {unplacedItems.map((itemObj) => (
                                <div
                                    key={itemObj.id}
                                    draggable
                                    onDragStart={(e) => e.dataTransfer.setData("itemId", itemObj.id)}
                                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border-2 border-white/10 hover:border-primary-500/50 rounded-xl text-xs font-bold text-gray-300 cursor-grab active:cursor-grabbing transition-all shadow-xl hover:scale-105 select-none"
                                >
                                    {itemObj.text}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center gap-6 pt-4">
                    {feedback === 'success' ? (
                        <div className="bg-emerald-500/10 border-2 border-emerald-500/30 p-6 rounded-[2.5rem] text-center space-y-3 animate-comic-pop max-w-2xl w-full">
                            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                            <div className="space-y-1">
                                <h4 className="text-emerald-400 font-black uppercase tracking-widest">¡Excelente Trabajo!</h4>
                                <p className="text-gray-300 text-sm font-medium leading-relaxed">
                                    {data.feedbackSuccess || 'Has clasificado correctamente todos los conceptos.'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 w-full">
                            {feedback === 'error' && (
                                <div className="bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl flex items-center gap-3 animate-shake mb-2">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                    <span className="text-[11px] font-black text-red-400 uppercase tracking-widest">
                                        {data.feedbackError || 'Algunos elementos están fuera de lugar o faltan conceptos.'}
                                    </span>
                                </div>
                            )}
                            
                            {!isCompleted && (
                                <button
                                    onClick={handleVerify}
                                    disabled={isVerifying || Object.keys(placedItems).length === 0}
                                    className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-2xl ${
                                        Object.keys(placedItems).length > 0 && !isVerifying
                                        ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-600/20 active:scale-95'
                                        : 'bg-slate-800 text-gray-600 cursor-not-allowed shadow-none border border-white/5'
                                    }`}
                                >
                                    {isVerifying ? 'Verificando...' : 'Verificar Resultados'}
                                    <Zap className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between w-full border-t border-white/5 pt-6">
                        {item.points > 0 && (
                            <div className={`px-6 py-2.5 rounded-2xl font-black text-[11px] transition-all duration-700 shadow-xl ${feedback === 'success' ? 'bg-yellow-500 text-slate-950 scale-105' : 'bg-slate-950 border border-white/10 text-yellow-500'}`}>
                                +{item.points} PTS {feedback === 'success' ? 'GANADOS' : ''}
                            </div>
                        )}
                        <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic">Actividad de Clasificación Interactiva</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
