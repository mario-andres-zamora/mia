import { Trophy, Info } from 'lucide-react';

export default function LevelsConfigTab({ levels, onUpdateLevel }) {
    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-950/40 border-b border-white/5">
                            <th className="px-10 py-6 text-center text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] w-24">Escala</th>
                            <th className="px-10 py-6 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.3em]">Identidad Funcional</th>
                            <th className="px-10 py-6 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] w-48">Umbral de Entrada</th>
                            <th className="px-10 py-6 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] w-56">Esfuerzo Relativo</th>
                            <th className="px-10 py-6 text-right text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] w-32">Config</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {levels.map((level, index) => (
                            <tr key={index} className="hover:bg-white/[0.03] transition-all duration-300 group">
                                <td className="px-10 py-6 text-center">
                                    <div className={`w-14 h-14 mx-auto rounded-3xl ${level.bgColor} ${level.color} flex items-center justify-center shadow-xl border border-white/10 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700`}>
                                        <level.icon className="w-7 h-7" />
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black text-white italic uppercase tracking-tight group-hover:text-primary-400 transition-colors">{level.name}</span>
                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] italic opacity-60">Jerarquía Nivel {index + 1}</span>
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="relative group/input max-w-[150px]">
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary-500 uppercase tracking-widest pointer-events-none opacity-40 group-focus-within/input:opacity-100 transition-opacity">PTS</div>
                                        <input
                                            type="number"
                                            className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white font-black focus:outline-none focus:border-primary-500/50 hover:border-white/20 transition-all uppercase appearance-none shadow-inner text-center"
                                            value={level.minPoints}
                                            onChange={(e) => onUpdateLevel(index, e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        {index > 0 ? (
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-secondary-500 uppercase tracking-[0.2em]">
                                                    <div className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse shadow-secondary-500/30 shadow-lg"></div>
                                                    +{level.minPoints - levels[index - 1].minPoints} Esfuerzo
                                                </div>
                                                <div className="w-40 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-secondary-600 to-primary-600 shadow-lg"
                                                        style={{ width: `${Math.min(100, (level.minPoints - levels[index - 1].minPoints) / 5)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2.5 px-4 py-1.5 bg-emerald-500/10 rounded-xl border border-emerald-500/10">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-emerald-500/40 shadow-lg"></div>
                                                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] italic leading-none">Punto Cero v0.0.1</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <div className={`inline-flex items-center px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] italic border transition-all ${index === 0 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10' : 'bg-slate-950 text-gray-500 border-white/5'}`}>
                                        {index === 0 ? 'Core Root' : 'Legacy Level'}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] shadow-2xl backdrop-blur-md">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-20 h-20 bg-primary-500/10 rounded-[2rem] flex items-center justify-center text-primary-400 border border-primary-500/20 shrink-0 shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-primary-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                        <Info className="w-10 h-10 group-hover:scale-110 transition-transform relative z-10" />
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Protocolo de Progresión Gamificada</h4>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed italic max-w-3xl opacity-80 uppercase tracking-widest">
                            <span className="text-primary-500 font-black mr-2 not-italic underline decoration-primary-500/40 underline-offset-8">INTEGRIDAD PEDAGÓGICA:</span>
                            El sistema de validación requiere que los umbrales de puntos se mantengan en una escala estrictamente ascendente (v_n &gt; v_n-1). 
                            Cualquier desviación en la matriz de puntos comprometerá el algoritmo de desbloqueo de insignias y certificaciones automáticas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
