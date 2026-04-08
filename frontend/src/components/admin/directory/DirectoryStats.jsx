import React from 'react';
import { Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function DirectoryStats({ stats }) {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="card p-5 flex items-center gap-4 bg-primary-500/5 border-primary-500/10">
                <div className="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-2xl font-black text-white">{stats.total}</p>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Funcionarios Totales</p>
                </div>
            </div>
            <div className="card p-5 flex items-center gap-4 bg-green-500/5 border-green-500/10">
                <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-2xl font-black text-green-500">{stats.registered}</p>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Iniciaron Sesión</p>
                </div>
            </div>
            <div className="card p-5 flex items-center gap-4 bg-secondary-500/5 border-secondary-500/10">
                <div className="w-11 h-11 rounded-xl bg-secondary-500/10 flex items-center justify-center text-secondary-500">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-2xl font-black text-orange-500">{stats.pending}</p>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Pendientes de Acceso</p>
                </div>
            </div>
        </div>
    );
}
