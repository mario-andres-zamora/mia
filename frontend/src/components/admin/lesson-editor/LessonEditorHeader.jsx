import { ArrowLeft, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonEditorHeader({ lesson, totalPoints }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-slate-900/40 p-6 rounded-[2rem] border border-white/5 backdrop-blur-sm">
            <div>
                <button
                    onClick={() => navigate('/admin/modules')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-3 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    <span className="text-[10px] font-black uppercase tracking-widest">Módulos de Formación</span>
                </button>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter">
                            Editor de <span className="text-primary-400">Lección</span>
                        </h1>
                        <p className="text-gray-400 font-medium">{lesson?.title || 'Sin título'}</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3 px-5 py-3 bg-primary-500/10 rounded-2xl border border-primary-500/20 shadow-lg shadow-primary-500/10">
                <div className="p-2 bg-primary-500/20 rounded-xl">
                    <Award className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                    <span className="text-[10px] font-black text-primary-500/60 uppercase tracking-[0.2em] block leading-none mb-1">Capacidad Total</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-primary-400 leading-none">
                            {totalPoints}
                        </span>
                        <span className="text-xs font-bold text-primary-500/50 uppercase">Puntos</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
