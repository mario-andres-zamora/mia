import React from 'react';
import { Users, ArrowLeft, Search } from 'lucide-react';

export default function UserHeader({ 
    filteredCount, 
    activeCount, 
    searchTerm, 
    onSearchChange, 
    onBack 
}) {
    return (
        <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 border border-white/5 p-10 md:p-14 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10 text-left">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left flex-1">
                <button
                    onClick={onBack}
                    className="p-5 bg-slate-950 border border-white/5 rounded-[2rem] shadow-2xl hover:scale-105 transition-transform group"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-500 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                </button>
                
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                        <Users className="w-3 h-3" /> GESTIÓN DE CAPITAL HUMANO
                    </div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
                        Control de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Funcionarios</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-sm font-medium">
                        Administra accesos, roles y supervisa el progreso académico del personal institucional.
                    </p>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="BUSCAR NOMBRE, EMAIL O UNIDAD..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-14 pr-8 py-5 bg-slate-950 border border-white/5 rounded-[2rem] text-white font-black text-xs focus:outline-none focus:border-primary-500/50 transition-all uppercase tracking-widest shadow-inner placeholder:text-gray-700"
                    />
                </div>
                
                <div className="flex items-center gap-4 bg-slate-950/50 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
                    <div className="px-6 py-2">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">TOTAL</p>
                        <p className="text-2xl font-black text-white">{filteredCount}</p>
                    </div>
                    <div className="w-[1px] h-8 bg-white/5"></div>
                    <div className="px-6 py-2">
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">ACTIVOS</p>
                        <p className="text-2xl font-black text-white">{activeCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
