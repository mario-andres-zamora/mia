import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DirectoryPagination({ 
    itemsPerPage, 
    onItemsPerPageChange, 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    indexOfFirstItem, 
    indexOfLastItem, 
    totalItems 
}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-left">
            <div className="flex items-center gap-4 bg-slate-900/40 px-6 py-3 rounded-2xl border border-white/5">
                <span>Mostrar</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => { onItemsPerPageChange(Number(e.target.value)); setCurrentPage(1); }}
                    className="bg-transparent border-none focus:outline-none text-white font-black cursor-pointer"
                >
                    {[10, 20, 50, 100].map(v => <option key={v} value={v} className="bg-slate-900">{v}</option>)}
                </select>
                <span>registros</span>
            </div>

            <div className="flex items-center gap-8">
                <span className="text-gray-400">
                    {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} de <span className="text-white">{totalItems}</span>
                </span>
                <div className="flex gap-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 bg-slate-900 border border-white/5 rounded-2xl hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-3 bg-slate-900 border border-white/5 rounded-2xl hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}
