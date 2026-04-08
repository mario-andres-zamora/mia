import { Building2, Star } from 'lucide-react';

export default function StrategicView({ filteredDepts }) {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <div className="col-span-1 text-center">Pos</div>
                    <div className="col-span-4">Área / Unidad</div>
                    <div className="col-span-4 italic text-gray-600">Mejor Funcionario (Líder)</div>
                    <div className="col-span-3 text-right uppercase">Puntaje Total</div>
                </div>
                {filteredDepts.map((dept, index) => (
                    <div key={index} className="grid grid-cols-12 items-center px-8 py-6 rounded-3xl border bg-slate-800/20 border-white/5 hover:border-primary-500/30 transition-all group cursor-default">
                        <div className="col-span-1 text-center font-black text-lg text-gray-500">{index + 1}</div>
                        <div className="col-span-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-secondary-500/10 flex items-center justify-center text-secondary-500 shadow-lg shadow-secondary-500/10">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-white group-hover:text-secondary-500 transition-colors uppercase tracking-tight">{dept.department}</p>
                                <p className="text-[10px] text-gray-300 font-bold uppercase">{dept.staff_count} Funcionarios</p>
                            </div>
                        </div>
                        <div className="col-span-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                                <Star className="w-4 h-4 fill-primary-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-300 uppercase tracking-tight">{dept.top_performer}</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase italic">Líder: {dept.top_points} pts</p>
                            </div>
                        </div>
                        <div className="col-span-3 text-right">
                            <p className="text-xl font-black text-white italic">{dept.total_points.toLocaleString()} PTS</p>
                            <div className="progress-bar h-1 mt-2">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${(dept.total_points / (filteredDepts[0]?.total_points || 1)) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
