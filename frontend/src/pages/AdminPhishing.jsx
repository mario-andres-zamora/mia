import { ShieldAlert, ArrowLeft, Clock, Construction, Sparkles, MessageSquare, Target, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminPhishing() {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] mb-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> VOLVER AL PANEL MAESTRO
                    </button>
                    <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                        SIMULACROS <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">DE PHISHING</span>
                    </h1>
                    <p className="text-gray-400 text-sm font-medium">Laboratorio de ingeniería social y evaluación de vulnerabilidad humana.</p>
                </div>
            </header>

            {/* Main Content - Placeholder Design */}
            <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 border border-white/5 p-10 md:p-20 shadow-2xl flex flex-col items-center text-center gap-10 min-h-[600px] justify-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_70%)]"></div>
                
                {/* Big Animated Icon */}
                <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-[60px] rounded-full animate-pulse"></div>
                    <div className="relative w-32 h-32 md:w-48 md:h-48 bg-slate-950 border-4 border-white/5 rounded-[3rem] flex items-center justify-center shadow-2xl group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <ShieldAlert className="w-16 h-16 md:w-24 md:h-24 text-orange-500 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </div>

                <div className="max-w-2xl space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <Construction className="w-3 h-3" /> MÓDULO EN DESARROLLO
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">
                        PROTECCIÓN <span className="text-orange-500">PROACTIVA</span> BAJO CONSTRUCCIÓN
                    </h2>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed">
                        Estamos diseñando una plataforma de simulación de ataques de última generación. 
                        Pronto podrás lanzar campañas autorizadas de concientización, rastrear clics en tiempo real 
                        y fortalecer la resiliencia del capital humano de la CGR.
                    </p>
                </div>

                {/* Feature Preview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mt-10">
                    {[
                        { icon: Sparkles, title: 'IA Generativa', desc: 'Creación de plantillas realistas mediante IA.' },
                        { icon: MessageSquare, title: 'Campañas Multi-canal', desc: 'Simulaciones por Email, SMS y Teams.' },
                        { icon: Target, title: 'Análisis de Red', desc: 'Identificación de nodos críticos de riesgo.' },
                        { icon: UserCheck, title: 'Auto-capacitación', desc: 'Rutas de aprendizaje para usuarios vulnerados.' }
                    ].map((f, i) => (
                        <div key={i} className="p-6 bg-slate-950/50 border border-white/5 rounded-[2rem] hover:border-orange-500/30 transition-all group hover:bg-slate-900 shadow-xl">
                            <f.icon className="w-8 h-8 text-orange-500/50 group-hover:text-orange-500 transition-colors mb-4 mx-auto" />
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2">{f.title}</h3>
                            <p className="text-[10px] text-gray-500 font-bold tracking-tight uppercase leading-tight">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Progress Indicator */}
                <div className="w-full max-w-md bg-slate-950 h-3 rounded-full overflow-hidden border border-white/5 p-[2px] mt-10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest mt-4">
                    <Clock className="w-3 h-3" /> LANZAMIENTO ESTIMADO: Q2 2026
                </div>
            </div>
        </div>
    );
}
