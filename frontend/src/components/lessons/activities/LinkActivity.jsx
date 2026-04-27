import React from 'react';
import { Link as LinkIcon, CheckCircle, Clock, Eye, Award, Zap } from 'lucide-react';

export default function LinkActivity({ item, data, visitedLinks, markLinkAsVisited }) {
    const isVisited = visitedLinks.has(item.id);

    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            onClick={() => markLinkAsVisited(item.id)}
        >
            <div className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl transition-all duration-500 border ${isVisited ? 'bg-green-500/5 border-green-500/30 shadow-lg shadow-green-500/10' : 'bg-slate-800/20 border-white/5 hover:border-green-500/30'}`}>
                <div className={`w-16 h-16 rounded-2xl transition-all duration-500 flex items-center justify-center flex-shrink-0 ${isVisited ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 rotate-0' : 'bg-green-500/10 text-green-400 group-hover:scale-110'}`}>
                    <LinkIcon className="w-8 h-8" />
                </div>

                <div className="flex-1 min-w-0 text-center md:text-left">
                    <h4 className={`text-lg font-bold flex items-center justify-center md:justify-start gap-2 transition-colors ${isVisited ? 'text-green-400' : 'text-white'}`}>
                        {item.title}
                        {isVisited && <CheckCircle className="w-4 h-4 text-green-400 animate-pulse" />}
                    </h4>
                    <p className="text-sm text-gray-500 truncate mt-1">{data.url}</p>

                    <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                        {!!item.is_required && !isVisited && (
                            <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                                <Clock className="w-3.5 h-3.5 mr-1 inline" /> Requerido
                            </span>
                        )}
                        {isVisited ? (
                            <span className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/30">
                                <CheckCircle className="w-3.5 h-3.5 mr-1 inline" /> Visitado
                            </span>
                        ) : (
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${item.is_required ? 'bg-white/5 text-gray-500 border-white/5' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                <Eye className="w-3.5 h-3.5 mr-1 inline" /> {item.is_required ? 'Pendiente' : 'Opcional'}
                            </span>
                        )}
                    </div>
                </div>

                {item.points > 0 && (
                    <div className="flex flex-col items-center md:items-end gap-1.5">
                        <div className={`relative px-5 py-2.5 rounded-2xl font-black text-sm transition-all duration-500 transform ${isVisited ? 'bg-yellow-500 text-slate-950 scale-110 shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                            +{item.points} PTS
                        </div>
                        {isVisited && (
                            <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest animate-pulse flex items-center gap-1">
                                <Award className="w-3 h-3" /> ¡Ganados!
                            </span>
                        )}
                    </div>
                )}

                <div className={`w-12 h-12 rounded-full hidden md:flex items-center justify-center transition-all ${isVisited ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 group-hover:bg-green-500 group-hover:text-white'}`}>
                    {isVisited ? <CheckCircle className="w-6 h-6" /> : <Zap className="w-6 h-6 animate-pulse" />}
                </div>
            </div>
        </a>
    );
}
