import React from 'react';
import { CheckCircle, XCircle, Clock, ClipboardList } from 'lucide-react';

export default function SubmissionCard({ sub, onOpenEvaluate }) {
    const statusConfig = {
        approved: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', icon: CheckCircle, label: 'Aprobado' },
        rejected: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', icon: XCircle, label: 'Rechazado' },
        pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', icon: Clock, label: 'Pendiente' }
    };
    
    const config = statusConfig[sub.status] || statusConfig.pending;
    const Icon = config.icon;

    return (
        <div className="group p-6 bg-slate-800/40 border border-white/5 rounded-3xl hover:bg-slate-800/60 hover:border-white/10 transition-all flex flex-col lg:flex-row gap-6 items-start lg:items-center relative overflow-hidden text-left">
            {/* Glow Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${config.bg.replace('/10', '/5')} blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            
            {/* User Info */}
            <div className="flex-shrink-0 w-full lg:w-64 text-left">
                <h3 className="text-white font-bold group-hover:text-primary-400 transition-colors uppercase tracking-tight">{sub.first_name} {sub.last_name}</h3>
                <p className="text-sm text-gray-400 font-medium">{sub.email}</p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500 uppercase font-black tracking-widest bg-black/20 w-fit px-2 py-0.5 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(sub.submitted_at).toLocaleString()}
                </div>
            </div>

            {/* Assignment Info */}
            <div className="flex-1 min-w-0 text-left">
                <div className="flex flex-col gap-1.5 mb-2">
                    <span className="text-[10px] bg-slate-900/80 text-primary-400 px-3 py-1 rounded-lg uppercase font-black truncate border border-primary-500/10 inline-block w-fit tracking-wider">
                        Módulo: {sub.module_title}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold truncate tracking-widest pl-1 uppercase">
                        LECCIÓN: {sub.lesson_title}
                    </span>
                </div>
                <h4 className="text-white font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    <ClipboardList className="w-5 h-5 text-pink-400" />
                    {sub.assignment_title}
                </h4>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t border-white/5 lg:border-t-0">
                <div className={`px-4 py-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} text-[10px] uppercase font-black tracking-widest flex items-center gap-2 justify-center w-full lg:w-auto shadow-inner`}>
                    <Icon className="w-3 h-3" />
                    {config.label}
                </div>

                <button
                    onClick={() => onOpenEvaluate(sub)}
                    className="whitespace-nowrap w-full lg:w-auto justify-center group/btn relative overflow-hidden font-black text-[10px] uppercase tracking-widest px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-400 transition-all shadow-lg active:scale-95"
                >
                    Evaluar Entrega
                </button>
            </div>
        </div>
    );
}
