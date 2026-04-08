import { Clock, Award, BookOpen } from 'lucide-react';

export default function LessonHeader({ lesson, contentsCount }) {
    return (
        <>
            {/* Compact Breadcrumbs / Header Mobile Only */}
            <div className="flex lg:hidden flex-col gap-4 mb-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                        {contentsCount} Items
                    </span>
                    <div className="flex gap-2">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full border border-white/5 flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> {lesson.duration_minutes}m
                        </span>
                        <span className="text-[10px] font-black text-secondary-500 uppercase tracking-widest bg-secondary-900/20 px-3 py-1 rounded-full border border-secondary-500/20 flex items-center gap-1.5 font-black">
                            <Award className="w-3 h-3" /> {lesson.total_points || 0} PTS
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Header (Desktop Info) */}
            <div className="hidden lg:flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-500/10 rounded-2xl border border-primary-500/20">
                        <BookOpen className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                        <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Lección Actual</h4>
                        <h1 className="text-2xl font-black text-white tracking-tight uppercase">{lesson.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Contenido</p>
                        <p className="text-sm font-bold text-white">{contentsCount} elementos</p>
                    </div>
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Recompensa</p>
                        <p className="text-sm font-bold text-secondary-400">{lesson.total_points || 0} PTS</p>
                    </div>
                </div>
            </div>

            {/* Title Header (Mobile/Legacy) */}
            <div className="lg:hidden pb-6 border-b border-white/5">
                <h1 className="text-3xl font-black text-white tracking-tighter leading-tight mb-2 uppercase">
                    {lesson.title}
                </h1>
                <p className="text-sm text-gray-400 font-medium">
                    Sigue el contenido en orden. Algunos elementos pueden ser obligatorios.
                </p>
            </div>
        </>
    );
}
