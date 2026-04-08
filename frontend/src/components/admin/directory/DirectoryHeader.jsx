import React from 'react';
import { ArrowLeft, Plus, FileUp, Download } from 'lucide-react';

export default function DirectoryHeader({ onBack, onAdd, onUpload, onDownloadTemplate, uploading }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
            <div className="space-y-1">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest mb-1"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Volver al Panel Admin
                </button>
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">Directorio Maestro</h1>
                <p className="text-gray-400 text-xs font-medium">Lista oficial de funcionarios para pre-asignación y control de acceso.</p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
                <button
                    onClick={onAdd}
                    className="px-5 py-3 bg-secondary-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl hover:bg-secondary-400 transition-all flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Agregar Funcionario
                </button>
                <label className={`flex-1 md:flex-none px-5 py-3 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl cursor-pointer hover:bg-primary-400 transition-all flex items-center justify-center gap-2 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <FileUp className="w-4 h-4" />
                    {uploading ? 'Sincronizando...' : 'Subir CSV'}
                    <input type="file" accept=".csv" className="hidden" onChange={onUpload} />
                </label>
                <button
                    onClick={onDownloadTemplate}
                    className="p-3 bg-slate-800 text-white rounded-xl border border-white/5 hover:bg-slate-700 transition-colors"
                    title="Descargar Plantilla"
                >
                    <Download className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
