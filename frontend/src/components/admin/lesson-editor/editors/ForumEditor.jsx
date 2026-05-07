import React from 'react';
import { MessageSquare, Reply } from 'lucide-react';

export default function ForumEditor({ 
    description, 
    onChangeDescription, 
    postPoints, 
    onChangePostPoints, 
    replyPoints, 
    onChangeReplyPoints,
    maxAwardedPosts,
    onChangeMaxAwardedPosts,
    maxAwardedReplies,
    onChangeMaxAwardedReplies
}) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                    Instrucciones / Tema del Foro
                </label>
                <textarea
                    required
                    className="w-full bg-[#0a0d18] border border-white/5 focus:border-primary-500/50 rounded-xl py-3 px-4 text-white text-sm outline-none transition-all hover:border-white/10 custom-scrollbar resize-y min-h-[120px]"
                    placeholder="Escribe las instrucciones o el tema de debate para el foro..."
                    value={description}
                    onChange={(e) => onChangeDescription(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary-400" /> 
                        Puntos por Nuevo Post
                    </label>
                    <input
                        type="number"
                        min="0"
                        className="w-full bg-[#0a0d18] border border-white/5 focus:border-primary-500/50 rounded-xl py-3 px-4 text-white text-sm font-semibold outline-none transition-all"
                        placeholder="Ej: 10"
                        value={postPoints}
                        onChange={(e) => onChangePostPoints(parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Reply className="w-4 h-4 text-secondary-400" /> 
                        Puntos por Respuesta
                    </label>
                    <input
                        type="number"
                        min="0"
                        className="w-full bg-[#0a0d18] border border-white/5 focus:border-secondary-500/50 rounded-xl py-3 px-4 text-white text-sm font-semibold outline-none transition-all"
                        placeholder="Ej: 5"
                        value={replyPoints}
                        onChange={(e) => onChangeReplyPoints(parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Límite de Posts Premiados
                    </label>
                    <input
                        type="number"
                        min="0"
                        className="w-full bg-[#0a0d18] border border-white/5 focus:border-primary-500/50 rounded-xl py-3 px-4 text-white text-sm font-semibold outline-none transition-all"
                        placeholder="Ej: 3 (0 = Sin límite)"
                        value={maxAwardedPosts}
                        onChange={(e) => onChangeMaxAwardedPosts(parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Límite de Respuestas Premiadas
                    </label>
                    <input
                        type="number"
                        min="0"
                        className="w-full bg-[#0a0d18] border border-white/5 focus:border-secondary-500/50 rounded-xl py-3 px-4 text-white text-sm font-semibold outline-none transition-all"
                        placeholder="Ej: 5 (0 = Sin límite)"
                        value={maxAwardedReplies}
                        onChange={(e) => onChangeMaxAwardedReplies(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
        </div>
    );
}
