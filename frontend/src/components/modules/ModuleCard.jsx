import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    BookOpen, 
    Clock, 
    ChevronRight, 
    CheckCircle, 
    Lock, 
    Calendar 
} from 'lucide-react';
import toast from 'react-hot-toast';
import CyberCat from '../CyberCat';

export default function ModuleCard({ module, user, viewAsStudent }) {
    const releaseDate = module.release_date ? new Date(module.release_date) : null;
    const isAdminView = user?.role === 'admin' && !viewAsStudent;
    const isDateLocked = releaseDate && releaseDate > new Date() && !isAdminView;
    const isPrerequisiteLocked = !!module.is_locked && !isAdminView;
    const isLocked = isDateLocked || isPrerequisiteLocked;

    const formattedDate = releaseDate
        ? releaseDate.toLocaleDateString('es-CR', { day: 'numeric', month: 'long' })
        : module.month;

    const cardSrc = new URL(`../../assets/card-banner/Tar-Sec-${(module.module_number ?? 0).toString().padStart(2, '0')}.svg`, import.meta.url).href;

    return (
        <div className="relative h-full">
            <Link
                to={isLocked ? '#' : `/modules/${module.id}`}
                onClick={(e) => {
                    if (isLocked) {
                        e.preventDefault();
                        toast.error(module.lock_reason || 'Módulo Bloqueado', { id: 'module-locked-warning' });
                    }
                }}
                className={`group relative flex flex-col h-full bg-[#151B2E]/40 border rounded-[2rem] overflow-hidden transition-all duration-500 ${isLocked
                    ? 'grayscale-[0.5] opacity-80 cursor-not-allowed border-white/5'
                    : module.completionPercentage === 100
                        ? 'bg-emerald-500/[0.03] border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.08)] hover:border-emerald-500/40'
                        : 'bg-[#151B2E] border-white/5 hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2 cursor-pointer'
                    }`}
            >
                {/* Banner Image */}
                <div className="h-36 w-full relative overflow-hidden">
                    <img
                        src={cardSrc}
                        alt={module.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            if (module.image_url) e.target.src = module.image_url;
                            else e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>

                {/* Accent line top */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${isLocked ? 'from-gray-600 to-gray-400' : module.completionPercentage === 100 ? 'from-emerald-600 to-teal-500' : 'from-primary-500 to-secondary-500'} opacity-60 z-20`}></div>

                <div className="flex-1 flex flex-col p-5 md:p-6">
                    {/* Badge and Number */}
                    <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 bg-[#0B0F1C] rounded-2xl border flex items-center justify-center text-2xl font-black transition-all shadow-2xl shrink-0 ${module.completionPercentage === 100
                                ? 'border-emerald-500/30 text-emerald-500 shadow-emerald-500/10'
                                : 'border-white/10 text-white group-hover:text-primary-400'
                                }`}>
                                {(module.module_number ?? 0) < 10 ? `0${module.module_number}` : module.module_number}
                            </div>
                            <span className={`${isLocked ? 'bg-slate-700/50 text-gray-400 border border-gray-600' : 'bg-primary-500/10 border border-primary-500/20 text-primary-400'} py-1.5 px-4 rounded-xl text-[10px] uppercase font-black tracking-widest flex items-center gap-1.5 min-w-[120px] justify-center shadow-sm`}>
                                {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                                {formattedDate}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className={`text-xl font-bold transition-colors leading-tight min-h-[3rem] ${
                                module.completionPercentage === 100 ? 'text-emerald-400' : 'text-white group-hover:text-primary-400'
                            }`}>
                                {module.title}
                            </h3>
                            {module.completionPercentage === 100 && (
                                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                            )}
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed font-medium opacity-80">
                            {module.description}
                        </p>
                    </div>

                    {/* Stats Footer */}
                    <div className="pt-5 mt-auto border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-gray-500">
                                <BookOpen className="w-4 h-4" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">{module.total_lessons || 0} Lecciones</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">{module.total_duration || 0} min</span>
                            </div>
                        </div>

                        {/* Progress and Link */}
                        <div className="flex flex-col gap-4">
                            {isLocked ? (
                                <motion.div
                                    initial={{ opacity: 0.8 }}
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-full py-4 flex flex-col items-center justify-center gap-2 bg-orange-500/10 rounded-xl border border-orange-500/30 text-orange-200 px-4 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                                >
                                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-orange-400">
                                        <CyberCat className="w-6 h-6 opacity-80" variant="static" color="#f97316" />
                                        {isPrerequisiteLocked ? 'Módulo Bloqueado' : 'Próximamente'}
                                    </div>
                                    {isPrerequisiteLocked && module.lock_reason && (
                                        <p className="text-[11px] text-orange-100/90 font-bold leading-tight text-center">
                                            {module.lock_reason}
                                        </p>
                                    )}
                                </motion.div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-widest">
                                            <span className={module.completionPercentage === 100 ? 'text-emerald-500/50' : 'text-gray-500'}>PROGRESO</span>
                                            <span className={module.completionPercentage === 100 ? 'text-emerald-400' : 'text-white'}>{module.completionPercentage || 0}%</span>
                                        </div>
                                        <div className={`h-1.5 rounded-full overflow-hidden ${module.completionPercentage === 100 ? 'bg-emerald-950/30' : 'bg-slate-950'}`}>
                                            <div
                                                className={`h-full transition-all duration-1000 shadow-sm ${
                                                    module.completionPercentage === 100 
                                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500' 
                                                    : 'bg-gradient-to-r from-[#EF8843] to-[#E56B24]'
                                                }`}
                                                style={{ width: `${module.completionPercentage || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className={`w-full py-3 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border ${
                                        module.completionPercentage === 100
                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white'
                                        : 'bg-primary-500/10 text-primary-400 border-primary-500/20 group-hover:bg-primary-500 group-hover:text-white'
                                    }`}>
                                        {module.completionPercentage === 100 ? (
                                            <>FINALIZADO <CheckCircle className="w-4 h-4" /></>
                                        ) : (
                                            <>CONTINUAR <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
