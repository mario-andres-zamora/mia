import React, { useState } from 'react';
import { X, Bell, Info, CheckCircle2, Cpu, Terminal, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import CyberCat from './CyberCat';

const API_URL = import.meta.env.VITE_API_URL;

const AnnouncementModal = ({ announcement, onClose }) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [isDismissing, setIsDismissing] = useState(false);

    if (!announcement) return null;

    const handleClose = async () => {
        if (dontShowAgain) {
            setIsDismissing(true);
            try {
                await axios.post(`${API_URL}/announcements/${announcement.id}/dismiss`);
            } catch (error) {
                console.error('Error dismissing announcement:', error);
            }
        }
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
                {/* Backdrop with Scanlines effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-slate-950/95 backdrop-blur-md pointer-events-auto overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
                </motion.div>

                {/* Modal Container - Gaming HUD Style (Angular) */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.9, opacity: 0, x: -20 }}
                    className="relative w-full max-w-lg overflow-visible"
                >
                    {/* CyberCat Mascot - Positioned Left */}
                    <div className="absolute -top-12 -left-12 z-20 hidden md:block">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500/40 blur-3xl rounded-full scale-125 animate-pulse"></div>
                            <div className="bg-[#1a2245] p-2 border-2 border-primary-400 shadow-[0_0_30px_rgba(56,74,153,0.6)]">
                                <CyberCat className="w-28 h-28" color="#384A99" />
                            </div>
                        </div>
                    </div>

                    {/* CyberCat Mascot - Mobile Version (Top Center but smaller) */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 md:hidden">
                        <div className="bg-[#1a2245] p-1 border-2 border-primary-500/50">
                            <CyberCat className="w-20 h-20" color="#384A99" />
                        </div>
                    </div>

                    <div className="bg-[#0b0f1d] border-2 border-primary-500/40 rounded-none overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.7),inset_0_0_30px_rgba(56,74_153,0.15)] relative">
                        {/* HUD Corners - Sharper */}
                        <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-secondary-500 opacity-80"></div>
                        <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-secondary-500 opacity-80"></div>
                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-secondary-500 opacity-80"></div>
                        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-secondary-500 opacity-80"></div>

                        {/* Top Bar - Angular/Tech */}
                        <div className="h-14 bg-gradient-to-r from-primary-900 via-slate-900 to-primary-900 border-b-2 border-primary-500/30 flex items-center justify-between px-6">
                            <div className="flex items-center gap-3 md:pl-20">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-4 bg-secondary-500"></div>
                                    <div className="w-1.5 h-4 bg-secondary-500/50"></div>
                                    <div className="w-1.5 h-4 bg-secondary-500/20"></div>
                                </div>
                                <span className="text-[11px] font-black text-white uppercase tracking-[0.3em] font-mono">SYS.ANNOUNCEMENT.v2.0</span>
                            </div>
                            <button onClick={handleClose} className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-transparent hover:border-red-500/50">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="p-10 pt-12 md:pl-16">
                            {/* Decorative Line */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary-500/50"></div>
                                <Terminal className="w-4 h-4 text-secondary-500" />
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary-500/50"></div>
                            </div>

                            {/* Title - Brutalist/Tech */}
                            <div className="text-center md:text-left mb-8 relative">
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none border-l-8 border-secondary-500 pl-4">
                                    {announcement.title}
                                </h2>
                            </div>

                            {/* Content Area - Sharp borders */}
                            <div className="bg-slate-900/80 border border-primary-500/20 rounded-none p-8 mb-10 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/5 rotate-45 translate-x-8 -translate-y-8"></div>
                                <div
                                    className="text-gray-300 text-sm leading-relaxed prose prose-invert max-w-none max-h-[35vh] overflow-y-auto pr-4 custom-scrollbar-gaming font-medium relative z-10"
                                    dangerouslySetInnerHTML={{ __html: announcement.content }}
                                />
                            </div>

                            <div className="flex flex-col gap-8">
                                {/* Checkbox - Angular Gaming style */}
                                <label className="flex items-center gap-4 cursor-pointer group w-fit select-none mx-auto md:mx-0">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={dontShowAgain}
                                            onChange={(e) => setDontShowAgain(e.target.checked)}
                                        />
                                        <div className={`w-7 h-7 rounded-none border-2 transition-all duration-300 flex items-center justify-center ${dontShowAgain
                                                ? 'bg-secondary-500 border-secondary-400 shadow-[0_0_20px_rgba(229,123,60,0.8)]'
                                                : 'border-white/20 bg-slate-800 group-hover:border-primary-500'
                                            }`}>
                                            {dontShowAgain && <CheckCircle2 className="w-5 h-5 text-white" />}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black uppercase tracking-widest text-primary-400 group-hover:text-white transition-colors">
                                            No volver a mostrar este mensaje
                                        </span>
                                    </div>
                                </label>

                                <button
                                    onClick={handleClose}
                                    disabled={isDismissing}
                                    className="group relative overflow-hidden py-6 bg-transparent text-white rounded-none font-black uppercase tracking-[0.4em] text-[13px] transition-all border-2 border-primary-500 hover:bg-primary-500 shadow-[0_0_20px_rgba(56,74,153,0.2)] disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-primary-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isDismissing ? 'DESCARTANDO...' : (
                                            <>
                                                CONFIRMAR LECTURA <Zap className="w-5 h-5 fill-white" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Footer decorative tech bar */}
                        <div className="flex h-1.5 w-full">
                            <div className="flex-1 bg-secondary-500"></div>
                            <div className="flex-1 bg-primary-500"></div>
                            <div className="flex-1 bg-secondary-500"></div>
                            <div className="flex-1 bg-primary-500"></div>
                            <div className="flex-1 bg-secondary-500"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AnnouncementModal;
