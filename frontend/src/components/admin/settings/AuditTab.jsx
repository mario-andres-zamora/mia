import { ShieldCheck } from 'lucide-react';

export default function AuditTab() {
    return (
        <div className="flex flex-col items-center justify-center py-40 bg-slate-900/30 rounded-[4rem] border-2 border-dashed border-white/5 animate-fade-in text-center group max-w-4xl mx-auto shadow-2xl backdrop-blur-md hover:border-primary-500/10 transition-all duration-1000">
            <div className="relative mb-12">
                <div className="absolute inset-0 bg-primary-500/10 blur-[80px] rounded-full scale-150 animate-pulse"></div>
                <div className="p-12 bg-slate-900 rounded-[3rem] border border-white/10 shadow-[0_0_80px_rgba(37,99,235,0.1)] mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-1000 group-hover:border-primary-500/40 relative z-10 overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-primary-500 opacity-20 animate-shimmer"></div>
                    <ShieldCheck className="w-24 h-24 text-gray-800 group-hover:text-primary-500 transition-colors duration-1000 group-hover:drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]" />
                </div>
            </div>
            
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4 drop-shadow-2xl">Bitácora de Auditoría Gerencial</h3>
            <div className="flex items-center gap-4 justify-center py-2 px-6 bg-slate-950 rounded-2xl border border-white/5 shadow-inner">
                <div className="w-3 h-1 bg-primary-500 rounded-full animate-bounce"></div>
                <p className="text-[12px] text-gray-500 uppercase tracking-[0.5em] font-black italic shadow-sm opacity-60">
                    Fase 2: Registro de Acciones Administrativas en Desarrollo
                </p>
                <div className="w-3 h-1 bg-primary-500 rounded-full animate-bounce delay-150"></div>
            </div>
            <p className="text-[9px] text-gray-800 font-black uppercase tracking-[0.6em] mt-8 opacity-40">Security Access Compliance v9.1.5</p>
        </div>
    );
}
