import { Lock, ShieldCheck, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ParticipantListView({ 
    view, 
    participants, 
    loggedUser, 
    isAdmin, 
    currentUser, 
    setView 
}) {
    const isGlobal = view === 'global';
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isPerPageOpen, setIsPerPageOpen] = useState(false);

    // Reset page to 1 when filters, view, search terms, or items per page change
    useEffect(() => {
        setCurrentPage(1);
    }, [participants, view, itemsPerPage]);

    if (isGlobal && !isAdmin) {
        return (
            <div className="py-20 flex flex-col items-center text-center space-y-6 animate-pulse-slow">
                <div className="w-24 h-24 rounded-[2rem] bg-slate-900 border border-white/10 flex items-center justify-center text-gray-700 shadow-2xl relative">
                    <Lock className="w-10 h-10 opacity-20" />
                    <ShieldCheck className="w-6 h-6 text-primary-500 absolute -bottom-1 -right-1" />
                </div>
                <div className="max-w-md space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Privacidad Institucional</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        El detalle del ranking global solo es visible para administradores.
                        Puedes ver tu posición oficial #<span className="text-primary-400 font-bold">{currentUser?.globalRank}</span> en la cabecera.
                    </p>
                    <div className="pt-6">
                        <button
                            onClick={() => setView('area')}
                            className="px-8 py-3 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-primary-400 hover:bg-white/10 rounded-xl transition-all"
                        >
                            Ver Ranking de mi Área
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const totalPages = Math.ceil(participants.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedParticipants = participants.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <div className="col-span-1 text-center">Pos</div>
                    <div className="col-span-6 md:col-span-5 px-6">Funcionario</div>
                    <div className="hidden md:block col-span-3 text-center">Área / Unidad</div>
                    <div className="col-span-5 md:col-span-3 text-right">Puntaje</div>
                </div>
                
                {paginatedParticipants.map((p) => {
                    const isMe = p.email === loggedUser?.email?.toLowerCase();
                    return (
                        <div key={p.id} className={`grid grid-cols-12 items-center px-8 py-5 rounded-3xl border transition-all ${isMe ? 'bg-primary-500/10 border-primary-500/30 ring-1 ring-primary-500/20 shadow-xl' : 'bg-slate-800/20 border-white/5 hover:border-white/10 hover:bg-slate-800/30'}`}>
                            <div className={`col-span-1 text-center font-black text-lg ${isMe ? 'text-primary-400' : 'text-gray-400'}`}>{p.rank_position}</div>
                            <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-white/5">
                                    <img src={(isMe ? loggedUser?.profilePicture : p.profile_picture) || `https://ui-avatars.com/api/?name=${p.first_name}+${p.last_name}&background=384A99&color=fff`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div className="px-2">
                                    <p className={`font-black uppercase text-sm ${isMe ? 'text-primary-400' : 'text-white'}`}>
                                        {p.first_name} {p.last_name}
                                        {isMe && <span className="ml-2 text-[8px] bg-primary-500 text-white px-1.5 py-0.5 rounded">TÚ</span>}
                                    </p>
                                    <p className={`text-[10px] ${isMe ? 'text-white/60' : 'text-gray-300'} font-bold uppercase md:hidden italic`}>{p.department}</p>
                                </div>
                            </div>
                            <div className={`hidden md:block col-span-3 text-center text-[10px] font-bold ${isMe ? 'text-white/60' : 'text-gray-300'} uppercase italic leading-tight`}>{p.department}</div>
                            <div className="col-span-12 md:col-span-3 text-right">
                                <p className="text-xl font-black text-primary-400 italic leading-none">{p.points} PTS</p>
                                <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em]">{p.level}</p>
                            </div>
                        </div>
                    );
                })}

                {participants.length === 0 && (
                    <div className="py-12 text-center text-gray-500 text-sm font-bold uppercase tracking-widest">
                        No se encontraron funcionarios
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {(totalPages > 1 || participants.length > 10) && (
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-slate-900/40 rounded-2xl border border-white/5 gap-4">
                    
                    {/* Rows per page selector */}
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mostrar</span>
                        <div className="relative">
                            <button 
                                onClick={() => setIsPerPageOpen(!isPerPageOpen)}
                                className="flex items-center gap-2 bg-slate-800/80 border border-white/10 hover:border-white/20 text-white text-xs font-black rounded-lg px-3 py-1.5 transition-all outline-none"
                            >
                                <span>{itemsPerPage}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isPerPageOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isPerPageOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsPerPageOpen(false)}></div>
                                    <div className="absolute bottom-full left-0 mb-2 w-full min-w-[70px] z-50 bg-slate-800 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
                                        {[10, 20, 50, 100].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => {
                                                    setItemsPerPage(val);
                                                    setIsPerPageOpen(false);
                                                }}
                                                className={`w-full text-center px-2 py-2.5 text-[11px] font-black transition-colors ${itemsPerPage === val ? 'bg-primary-500 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                            >
                                                {val}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">por pág</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl text-gray-500 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="hidden sm:inline text-xs font-black uppercase tracking-widest">Ant</span>
                        </button>
                        
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <span className="text-primary-400 mx-1">{currentPage}</span> / <span className="text-white mx-1">{totalPages || 1}</span>
                        </div>

                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-2 rounded-xl text-gray-500 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2"
                        >
                            <span className="hidden sm:inline text-xs font-black uppercase tracking-widest">Sig</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
