import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Terminal, XCircle, CheckCircle2, Smartphone } from 'lucide-react';
import { useSoundStore } from '../../../store/soundStore';

export default function MfaDefenderActivity({ item, data, visitedLinks, markLinkAsVisited, playSuccess, playError }) {
    const isMfaCompleted = visitedLinks.has(item.id);
    const audioRef = useRef(null);
    const { playSound } = useSoundStore();
    const [mfaStatus, setMfaStatus] = useState(isMfaCompleted ? 'won' : 'idle');
    const [mfaCode, setMfaCode] = useState('------');
    const [userMfaInput, setUserMfaInput] = useState('');
    const [mfaFails, setMfaFails] = useState(0);

    // Cálculos derivados reactivos
    const hackTimeLimit = data.hack_time || 20;
    const mfaRotateTime = data.rotate_time || 5;
    const failPenalty = parseInt(data.fail_penalty) || 0;
    const currentPotentialPoints = Math.max(0, item.points - (mfaFails * failPenalty));

    const [timeLeft, setTimeLeft] = useState(hackTimeLimit);
    const [rotateProgress, setRotateProgress] = useState(100);

    const generateMfaCode = () => Math.floor(100000 + Math.random() * 900000).toString();

    const startMfaGame = () => {
        if (isMfaCompleted) return;
        setMfaStatus('playing');
        setTimeLeft(hackTimeLimit);
        setMfaCode(generateMfaCode());
        setRotateProgress(100);
        setUserMfaInput('');

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current = playSound('/sounds/mistery.mp3');
        if (audioRef.current) {
            audioRef.current.loop = true;
        }
    };

    useEffect(() => {
        if (mfaStatus !== 'playing' && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [mfaStatus]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        let interval;
        if (mfaStatus === 'playing') {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0.1) {
                        setMfaStatus('failed');
                        setMfaFails(f => {
                            const newFails = f + 1;
                            console.info(`[MFA-Lesson] FAILURE (Timeout)! Current fails: ${newFails}`);
                            return newFails;
                        });
                        playError?.();
                        return 0;
                    }
                    return prev - 0.1;
                });

                setRotateProgress(prev => {
                    const step = (100 / (mfaRotateTime * 10));
                    if (prev <= step) {
                        setMfaCode(generateMfaCode());
                        setMfaFails(f => {
                            const newFails = f + 1;
                            console.info(`[MFA-Lesson] FAILURE (Code Expired)! Current fails: ${newFails}`);
                            return newFails;
                        });
                        return 100;
                    }
                    return prev - step;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [mfaStatus, hackTimeLimit, mfaRotateTime, playError]);

    const handleMfaSubmit = () => {
        if (mfaStatus !== 'playing') return;
        if (userMfaInput === mfaCode) {
            setMfaStatus('won');
            playSuccess?.();
            markLinkAsVisited(item.id, { mfaFails });
        } else {
            playError?.();
            setMfaFails(prev => {
                const newFails = prev + 1;
                console.info(`[MFA-Lesson] FAILURE (Wrong Code)! Current fails: ${newFails}`);
                return newFails;
            });
            setUserMfaInput('');
        }
    };

    return (
        <div className={`p-8 rounded-[2.5rem] transition-all duration-700 border-2 ${mfaStatus === 'won' ? 'bg-indigo-500/10 border-indigo-500/30' : mfaStatus === 'failed' ? 'bg-red-500/10 border-red-500/30 animate-shake' : 'bg-slate-900/40 border-white/5'}`}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${mfaStatus === 'won' ? 'bg-indigo-500 text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.title || 'Defensor MFA'}</h3>
                            <p className="text-sm text-gray-400 font-medium italic">
                                {data.description || 'El atacante tiene tu contraseña.'}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black text-white/40 uppercase tracking-wider">Recompensa:</span>
                            <span className={`text-lg font-black tracking-tighter ${currentPotentialPoints === item.points ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                {currentPotentialPoints} <span className="text-xs text-white/30">/ {item.points} PTS</span>
                            </span>
                        </div>
                        {failPenalty > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-red-500/60 uppercase tracking-widest">
                                    Panel de Riesgo: -{failPenalty} PTS x fallo
                                </span>
                                {mfaFails > 0 && (
                                    <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[9px] font-black text-red-500 uppercase animate-pulse">
                                        -{mfaFails * failPenalty} acumulado ({mfaFails})
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto w-full">
                    <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0"></div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-red-500 animate-pulse">
                                <div className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Intruso Detectado</div>
                                <div>IP 192.168.XXX.XXX</div>
                            </div>
                            <div className="font-mono text-sm text-gray-500 leading-relaxed font-bold break-words">
                                &gt; Extrayendo credenciales... OK<br />
                                &gt; Match de contraseña... OK<br />
                                &gt; Obteniendo acceso root...
                            </div>
                        </div>
                        <div className="mt-8 space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-[11px] font-black text-red-400 uppercase tracking-widest">Progreso del Hackeo</span>
                                <span className="font-mono text-red-500 font-bold">{Math.max(0, timeLeft).toFixed(1)}s</span>
                            </div>
                            <div className="w-full h-3 bg-red-950/50 rounded-full overflow-hidden border border-red-500/20">
                                <div
                                    className="h-full bg-red-500 rounded-full transition-all duration-100 relative"
                                    style={{ width: `${(1 - (timeLeft / hackTimeLimit)) * 100}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-3xl p-6 border-4 border-slate-700 relative shadow-2xl flex flex-col items-center justify-center min-h-[300px]">
                        <div className="absolute top-2 w-16 h-1.5 bg-slate-900 rounded-full"></div>

                        {mfaStatus === 'idle' ? (
                            <div className="flex flex-col items-center gap-3">
                                <button
                                    onClick={startMfaGame}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 hover:scale-105 active:scale-95"
                                >
                                    <ShieldAlert className="w-5 h-5" /> Iniciar Defensa
                                </button>
                            </div>
                        ) : mfaStatus === 'failed' ? (
                            <div className="text-center space-y-4 animate-fade-in">
                                <XCircle className="w-16 h-16 text-red-500 mx-auto animate-shake" />
                                <div className="text-red-400 font-black uppercase tracking-widest">¡Sistema Comprometido!</div>
                                <button
                                    onClick={startMfaGame}
                                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-[10px] uppercase px-4 py-2 rounded-lg transition-colors mt-2"
                                >
                                    Reintentar
                                </button>
                            </div>
                        ) : mfaStatus === 'won' ? (
                            <div className="text-center space-y-4 animate-fade-in p-2">
                                <CheckCircle2 className="w-16 h-16 text-indigo-400 mx-auto scale-110" />
                                <div className="space-y-1">
                                    <div className="text-indigo-400 font-black uppercase tracking-widest text-lg">¡Misión Cumplida!</div>
                                    <div className="flex flex-col items-center gap-1">
                                        <p className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em]">
                                            PUNTOS GANADOS: {currentPotentialPoints} PTS
                                        </p>
                                        {mfaFails > 0 && failPenalty > 0 && (
                                            <p className="text-[9px] text-red-500/80 font-bold uppercase tracking-[0.1em] animate-pulse">
                                                (Penalización aplicada: -{mfaFails * failPenalty} pts por {mfaFails} fallos)
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-sm text-slate-300 font-medium leading-relaxed mt-4">
                                    Como acabas de experimentar, la contraseña por sí sola ya no es suficiente. El MFA añade una capa de seguridad vital.
                                </div>
                            </div>
                        ) : (
                            <div className="w-full space-y-6 text-center animate-fade-in">
                                <div className="flex items-center justify-center gap-2 text-indigo-400 mb-2">
                                    <Smartphone className="w-5 h-5" />
                                    <span className="font-extrabold text-[11px] uppercase tracking-widest text-slate-400">Authenticator App</span>
                                </div>

                                <div className="font-mono text-4xl text-white font-black tracking-[0.2em]">
                                    {mfaCode.substring(0, 3)} <span className="text-indigo-400">{mfaCode.substring(3)}</span>
                                </div>

                                <div className="w-full max-w-[200px] mx-auto h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 transition-all duration-100"
                                        style={{ width: `${rotateProgress}%` }}
                                    ></div>
                                </div>

                                <div className="pt-4 space-y-3">
                                    <input
                                        type="text"
                                        placeholder="000000"
                                        maxLength={6}
                                        value={userMfaInput}
                                        onChange={(e) => setUserMfaInput(e.target.value.replace(/\D/g, ''))}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && userMfaInput.length === 6) {
                                                handleMfaSubmit();
                                            }
                                        }}
                                        className="w-full bg-slate-900 border-2 border-white/10 rounded-2xl py-4 px-6 text-center text-2xl font-black tracking-widest text-white outline-none focus:border-indigo-500/50 transition-all"
                                    />
                                    <button
                                        onClick={handleMfaSubmit}
                                        disabled={userMfaInput.length !== 6}
                                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl transition-all shadow-lg active:scale-95"
                                    >
                                        Validar Token
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
