import React from 'react';
import { AlertTriangle, CheckCircle2, Mail } from 'lucide-react';

export default function RiskAlerts({ atRisk, onSendReminders }) {
    return (
        <div className="card bg-red-500/5 border-red-500/20 p-8 space-y-6 relative overflow-hidden group text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full blur-[80px] group-hover:bg-red-500/20 transition-all"></div>
            <h3 className="text-lg font-black text-red-400 uppercase tracking-tight flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
                Alertas de Riesgo
            </h3>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                Listado de funcionarios con avance crítico (<span className="text-red-400 font-bold">menos del 20%</span>) que requieren seguimiento inmediato.
            </p>

            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {atRisk.length > 0 ? atRisk.map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-red-500/20 transition-all">
                        <div className="flex-1">
                            <p className="text-xs font-black text-white uppercase">{user.first_name} {user.last_name}</p>
                            <p className="text-[9px] text-gray-500 font-black uppercase mt-1 italic">{user.department}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-black text-red-500">{Math.round(user.progress)}%</span>
                            <p className="text-[8px] text-gray-700 font-black uppercase leading-none">Progreso</p>
                        </div>
                    </div>
                )) : (
                    <div className="py-10 text-center space-y-3">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic font-medium">Bajo control: 0 alertas</p>
                    </div>
                )}
            </div>

            <button
                onClick={onSendReminders}
                className="w-full py-5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-400 transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-3"
            >
                <Mail className="w-4 h-4" /> Enviar Recordatorio Masivo
            </button>
        </div>
    );
}
