import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Shield, Lock, Trophy } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function BadgesModal({ isOpen, onClose, badges: earnedBadges }) {
    const [allBadges, setAllBadges] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchAllBadges();
        }
    }, [isOpen]);

    const fetchAllBadges = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/badges`);
            if (response.data.success) {
                // Filter and sort badges by name
                const publicBadges = response.data.badges
                    .filter(b => b.is_public !== 0)
                    .sort((a, b) => a.name.localeCompare(b.name));
                setAllBadges(publicBadges);
            }
        } catch (error) {
            console.error('Error fetching all badges:', error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to check if a badge is earned
    const isEarned = (badgeId) => {
        return Array.isArray(earnedBadges) && earnedBadges.some(eb => eb.id === badgeId);
    };

    // Helper to get earned date if available
    const getEarnedDate = (badgeId) => {
        const earned = Array.isArray(earnedBadges) && earnedBadges.find(eb => eb.id === badgeId);
        return earned ? earned.earned_at : null;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl pointer-events-auto"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-7xl bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-300"
                    >
                        {/* Decorative background Elements */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        {/* Scrollable Container (Everything inside) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar z-10">
                            {/* Header (Inside scroll to avoid clipping tooltips) */}
                            <div className="relative p-6 md:p-8 md:px-16 border-b border-white/5 flex items-center justify-between">
                                <div className="text-left">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="p-2 bg-primary-500/20 rounded-xl">
                                            <Trophy className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <h2 className="text-xl md:text-3xl font-black text-[var(--text-color)] uppercase tracking-tight text-left">Insignias</h2>
                                    </div>
                                    <p className="text-gray-500 text-[9px] md:text-xs font-black uppercase tracking-[0.2em]">Logros y reconocimientos disponibles</p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                                >
                                    <X className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            {/* Badges Grid */}
                            <div className="p-6 pt-10 md:p-12 md:pt-14">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8 md:gap-10">
                                    {loading ? (
                                        [...Array(10)].map((_, i) => (
                                            <div key={`loading-${i}`} className="aspect-square rounded-3xl bg-white/5 animate-pulse" />
                                        ))
                                    ) : (
                                        allBadges.map((badge, i) => {
                                            const earned = isEarned(badge.id);
                                            const earnedDate = getEarnedDate(badge.id);
                                            
                                            return (
                                                <motion.div
                                                    key={badge.id || i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className={`group relative flex flex-col gap-4 text-center z-0 hover:z-50 ${!earned ? 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500' : ''}`}
                                                >
                                                    <div className={`aspect-square rounded-3xl bg-[#0d1127] border ${earned ? 'border-primary-500/30' : 'border-white/5'} flex items-center justify-center relative cursor-default shadow-2xl transition-all duration-500 hover:border-primary-500/50 hover:shadow-primary-500/10 group/badge`}>
                                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                                                        
                                                        {!earned && (
                                                            <div className="absolute top-3 right-3 z-20">
                                                                <Lock className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary-400 transition-colors" />
                                                            </div>
                                                        )}

                                                        <img
                                                            src={badge.image_url ? (badge.image_url.startsWith('http') ? badge.image_url : `/images/badges/${badge.image_url}`) : '/images/shield.svg'}
                                                            alt={badge.name}
                                                            className={`w-full h-full object-contain p-4 transition-transform duration-700 group-hover/badge:scale-110 ${earned ? 'drop-shadow-[0_0_20px_rgba(56,74,153,0.3)]' : 'drop-shadow-none'}`}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = '/images/shield.svg';
                                                            }}
                                                        />

                                                        {/* Floating Tooltip Detail */}
                                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full w-64 p-5 bg-[#0d1127] border border-primary-500/40 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none text-center z-[100] backdrop-blur-xl group-hover:-top-6 scale-90 group-hover:scale-100">
                                                            {/* Tooltip Triangle */}
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0d1127] border-r border-b border-primary-500/40 rotate-45 -translate-y-2"></div>
                                                            
                                                            <div className="relative z-10">
                                                                <div className="w-full mb-3 pb-2 border-b border-white/10">
                                                                    <p className={`text-[11px] font-black ${earned ? 'text-primary-400' : 'text-secondary-500'} uppercase tracking-[0.2em] leading-none`}>
                                                                        {badge.name}
                                                                    </p>
                                                                    <div className="mt-1 flex items-center justify-center gap-1">
                                                                        <span className="text-[9px] font-black text-primary-400">+{badge.points || 10}</span>
                                                                        <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">puntos</span>
                                                                    </div>
                                                                </div>
                                                                
                                                                <p className="text-[11px] text-gray-100 font-bold leading-relaxed italic">
                                                                    "{badge.description}"
                                                                </p>

                                                                {!earned && (
                                                                    <div className="mt-4 pt-3 w-full border-t border-white/5">
                                                                        <p className="text-[9px] text-primary-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                                                            <Lock className="w-3 h-3" />
                                                                            Insignia Bloqueada
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <p className={`text-[11px] font-bold uppercase tracking-tight transition-colors px-1 line-clamp-2 min-h-[2.4rem] leading-[1.2] text-center pt-1 ${earned ? 'text-[var(--text-color)] group-hover:text-primary-400' : 'text-gray-500'}`}>
                                                            {badge.name}
                                                        </p>
                                                        <div className="flex items-center justify-center gap-1.5 mt-0.5">
                                                            <span className={`text-[9px] font-black ${earned ? 'text-primary-400' : 'text-gray-600'}`}>+{badge.points || 10} PTS</span>
                                                            <span className="text-gray-800 text-[10px]">•</span>
                                                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
                                                                {earned ? (earnedDate ? new Date(earnedDate).toLocaleDateString() : 'Obtenida') : 'Bloqueada'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                            {/* Footer Info (Inside scroll) */}
                            <div className="p-10 bg-white/5 border-t border-white/5 text-center flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_15px_rgba(56,74,153,1)]" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Insignias Ganadas: {earnedBadges?.length || 0}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Disponibles: {allBadges.length}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

