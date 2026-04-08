import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function AssignmentStatsGrid({ pending, approved, rejected }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:bg-slate-800 transition-all border-l-[6px] border-l-primary-500">
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Pendientes</p>
                    <h3 className="text-3xl font-black text-white uppercase">{pending}</h3>
                </div>
                <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform border border-primary-500/20">
                    <Clock className="w-7 h-7" />
                </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:bg-slate-800 transition-all border-l-[6px] border-l-emerald-500">
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Aprobados</p>
                    <h3 className="text-3xl font-black text-white uppercase">{approved}</h3>
                </div>
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform border border-emerald-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:bg-slate-800 transition-all border-l-[6px] border-l-red-500">
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Correcciones</p>
                    <h3 className="text-3xl font-black text-white uppercase">{rejected}</h3>
                </div>
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform border border-red-500/20">
                    <XCircle className="w-7 h-7" />
                </div>
            </div>
        </div>
    );
}
