import { Search, Filter, MoreVertical } from 'lucide-react';

export default function AdminModulesSearch({ searchTerm, setSearchTerm }) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
            <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                <input
                    type="text"
                    placeholder="Buscar por título o descripción..."
                    className="w-full bg-slate-950/50 border border-white/5 focus:border-primary-500/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-700 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 border border-white/5 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-slate-700 transition-all">
                    <Filter className="w-4 h-4" />
                    FILTROS
                </button>
                <div className="p-3 bg-slate-800 rounded-xl border border-white/5 text-gray-400 cursor-pointer hover:bg-slate-700 transition-all">
                    <MoreVertical className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
