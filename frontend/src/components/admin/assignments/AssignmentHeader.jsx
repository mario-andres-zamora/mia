import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function AssignmentHeader({ onBack, pendingCount, totalCount }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-900 px-8 py-6 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-md text-left">
            <div className="flex items-center gap-6">
                <button
                    onClick={onBack}
                    className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 group shadow-inner"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 group-hover:text-white transition-all" />
                </button>
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight italic">Centro de <span className="text-secondary-500">Evaluación</span></h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Supervisión en Tiempo Real</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/50 p-2 rounded-2xl border border-white/5">
                <div className="flex flex-col items-end px-4">
                    <span className="text-xl font-black text-white">{pendingCount}</span>
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Tareas Pendientes</span>
                </div>
                <div className="w-[1px] h-10 bg-white/5"></div>
                <div className="flex flex-col items-end px-4">
                    <span className="text-xl font-black text-gray-400">{totalCount}</span>
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Total Histórico</span>
                </div>
            </div>
        </div>
    );
}
