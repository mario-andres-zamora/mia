import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, Trash2, Shield, User, CornerDownRight, ArrowBigUp } from 'lucide-react';
import ForumInput from './ForumInput';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuthStore } from '../../../../store/authStore';
import { useSoundStore } from '../../../../store/soundStore';
import CyberCat from '../../../CyberCat';

export default function ForumPost({
    post,
    currentUser,
    onReply,
    onDelete,
    onUpvote,
    isReply = false
}) {
    const [isReplying, setIsReplying] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const isAuthor = currentUser?.id === post.user_id;
    const { viewAsStudent } = useAuthStore();
    const { playSound } = useSoundStore();
    const isAdmin = currentUser?.role === 'admin' && !viewAsStudent;
    const canDelete = isAuthor || isAdmin;

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setShowDeleteModal(false);
        setIsDeleting(true);
        playSound('/sounds/delete.mp3');
        await onDelete(post.id);
        setIsDeleting(false); // Only needed if it fails and doesn't unmount
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleReplySubmit = async (message) => {
        const result = await onReply(post.id, message);
        if (result.success) {
            playSound('/sounds/create-post.mp3');
            setIsReplying(false);
        }
        return result;
    };

    const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es });

    return (
        <div className={`group flex gap-3 sm:gap-4 ${isReply ? 'relative' : 'bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-white/5 animate-fade-in-up'}`}>

            {/* Avatar Column */}
            <div className="flex-shrink-0 flex flex-col items-center">
                {post.profile_picture ? (
                    <img
                        src={post.profile_picture}
                        alt={`${post.first_name} ${post.last_name}`}
                        className={`rounded-full object-cover border border-white/10 ${isReply ? 'w-8 h-8' : 'w-12 h-12'}`}
                    />
                ) : (
                    <div className={`bg-slate-800 rounded-full flex items-center justify-center border border-white/10 ${isReply ? 'w-8 h-8' : 'w-10 h-10'}`}>
                        <User className={`${isReply ? 'w-4 h-4' : 'w-5 h-5'} text-gray-500`} />
                    </div>
                )}
            </div>

            {/* Content Column */}
            <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">
                            {post.first_name} {post.last_name}
                        </span>

                        {post.role === 'admin' && (
                            <span className="flex items-center gap-1 bg-primary-500/10 text-primary-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-primary-500/20">
                                <Shield className="w-3 h-3" /> Admin
                            </span>
                        )}

                        {post.level && post.role !== 'admin' && (
                            <span className="bg-slate-800 text-gray-400 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border border-white/5">
                                Lvl {post.level}
                            </span>
                        )}

                        <span className="text-gray-500 text-xs font-medium">• {timeAgo}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {canDelete && (
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                title="Eliminar mensaje"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Message Body */}
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {post.message?.trim()}
                </div>

                {/* Footer / Reply Button */}
                <div className="mt-3 flex items-center gap-4">
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${isReplying ? 'text-primary-400' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <MessageCircle className="w-3.5 h-3.5" />
                        {isReplying ? 'Cancelar Respuesta' : 'Responder'}
                    </button>

                    <button
                        onClick={() => onUpvote && onUpvote(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${post.has_upvoted ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'}`}
                    >
                        <ArrowBigUp className={`w-4 h-4 ${post.has_upvoted ? 'fill-current' : ''}`} />
                        {post.upvotes || 0}
                    </button>

                    {!isReply && post.replies?.length > 0 && (
                        <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                            <CornerDownRight className="w-3.5 h-3.5" />
                            {post.replies.length} {post.replies.length === 1 ? 'respuesta' : 'respuestas'}
                        </span>
                    )}
                </div>

                {/* Reply Input Area */}
                {isReplying && (
                    <div className="mt-4 pl-4 border-l-2 border-primary-500/30">
                        <ForumInput
                            onSubmit={handleReplySubmit}
                            placeholder={`Respondiendo a ${post.first_name}...`}
                            buttonText="Enviar Respuesta"
                            onCancel={() => setIsReplying(false)}
                            autoFocus={true}
                        />
                    </div>
                )}

                {/* Nested Replies */}
                {post.replies && post.replies.length > 0 && (
                    <div className="mt-4 pl-4 sm:pl-5 border-l-2 border-slate-800/80 space-y-4 pt-2">
                        {post.replies.map(reply => (
                            <ForumPost
                                key={reply.id}
                                post={reply}
                                currentUser={currentUser}
                                onReply={onReply}
                                onDelete={onDelete}
                                onUpvote={onUpvote}
                                isReply={true}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Delete Confirmation Modal */}
            {showDeleteModal && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden animate-fade-in-up">
                        {/* Decorative glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
                        
                        <div className="relative flex flex-col items-center text-center">
                            <CyberCat variant="panic" className="w-24 h-24 mb-4 drop-shadow-lg" />
                            <h3 className="text-xl font-black text-white mb-2">¿Eliminar Mensaje?</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Esta acción es irreversible y el mensaje desaparecerá del foro permanentemente.
                            </p>
                            
                            <div className="flex gap-3 w-full">
                                <button 
                                    onClick={cancelDelete}
                                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                                >
                                    Sí, Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
