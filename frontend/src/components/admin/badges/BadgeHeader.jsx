import React from 'react';
import { ArrowLeft, Plus, Search } from 'lucide-react';

export default function BadgeHeader({ onBack, searchTerm, onSearchChange, onCreate }) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
            <div className="space-y-1">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-4"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver al Panel Admin
                </button>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Sistema de Insignias</h1>
                <p className="text-gray-400 text-sm font-medium">Gestión de reconocimientos y criterios de gamificación.</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar insignias..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-11 pr-6 py-4 bg-slate-800/20 border border-white/5 rounded-2xl text-white font-medium focus:outline-none focus:border-primary-500/50 transition-all font-bold"
                    />
                </div>
                <button
                    onClick={onCreate}
                    className="px-8 py-4 bg-primary-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                >
                    <Plus className="w-5 h-5" /> Nueva
                </button>
            </div>
        </header>
    );
}
