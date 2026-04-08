import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonNavigation({ navigation }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <button
                disabled={!navigation.prev}
                onClick={() => navigate(`/lessons/${navigation.prev}`)}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-800/40 text-gray-400 border border-white/5 hover:border-white/10 hover:bg-slate-800 transition-all disabled:opacity-20 disabled:pointer-events-none group w-full sm:w-auto overflow-hidden relative"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform relative z-10" />
                <div className="text-left relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-50 leading-none mb-1">Anterior</p>
                    <p className="text-sm font-bold truncate max-w-[150px]">Lección Previa</p>
                </div>
            </button>

            <button
                disabled={!navigation.next}
                onClick={() => navigate(`/lessons/${navigation.next}`)}
                className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-primary-500/10 text-primary-400 border border-primary-500/30 hover:bg-primary-500/20 transition-all disabled:opacity-20 disabled:pointer-events-none group w-full sm:w-auto relative"
            >
                <div className="text-right relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-50 leading-none mb-1">Siguiente</p>
                    <p className="text-sm font-bold truncate max-w-[150px]">Próximo Contenido</p>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
        </div>
    );
}
