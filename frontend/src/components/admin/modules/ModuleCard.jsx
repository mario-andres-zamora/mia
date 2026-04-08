import { CheckCircle2, EyeOff, Award, Calendar, Clock, Eye, Edit2, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import ModuleLessons from './ModuleLessons.jsx';
import ModuleResources from './ModuleResources.jsx';

export default function ModuleCard({ 
    module, 
    expandedModule, 
    onToggleExpansion, 
    onTogglePublish, 
    onEditModule, 
    onDeleteModule,
    lessons,
    resources,
    contentLoading,
    onNewLesson,
    onEditLesson,
    onDeleteLesson,
    onToggleLessonOptional,
    onOpenLessonEditor,
    onNewResource,
    onEditResource,
    onDeleteResource
}) {
    const isExpanded = expandedModule === module.id;

    return (
        <div 
            className={`group relative overflow-hidden transition-all duration-500 rounded-[2.5rem] border ${
                isExpanded 
                ? 'bg-slate-900 border-primary-500/30 ring-1 ring-primary-500/20' 
                : 'bg-slate-900/40 border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-primary-500/5 shadow-xl'
            }`}
        >
            {/* Decorative Background for active module */}
            {isExpanded && (
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            )}

            <div className="p-6 md:p-10">
                <div className="flex flex-col xl:flex-row justify-between items-start mb-8 gap-6">
                    <div className="flex items-center gap-6">
                        {/* Module Number Display */}
                        <div className="relative w-24 h-24 bg-slate-950 rounded-[2rem] flex items-center justify-center text-3xl font-black border border-white/10 overflow-hidden shadow-2xl flex-shrink-0 group-hover:scale-105 group-hover:rotate-1 transition-all duration-700">
                            {(() => {
                                const num = module.module_number ?? 0;
                                const paddedNum = num.toString().padStart(2, '0');
                                const cardSrc = new URL(`../../../assets/card-banner/Tar-Sec-${paddedNum}.svg`, import.meta.url).href;
                                return (
                                    <>
                                        <img
                                            src={cardSrc}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                        <div className="relative z-10 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] italic">
                                            {module.module_number}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                                    </>
                                );
                            })()}
                        </div>

                        <div className="flex-1 min-w-0 pr-4">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                {module.is_published ? (
                                    <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> PUBLICADO
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-slate-800 text-gray-500 border border-white/5 shadow-inner">
                                        <EyeOff className="w-3.5 h-3.5" /> BORRADOR
                                    </span>
                                )}
                                {module.generates_certificate && (
                                    <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-lg shadow-primary-500/5">
                                        <Award className="w-3.5 h-3.5 text-primary-400" /> CERTIFICADO
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-black text-white group-hover:text-primary-400 transition-colors truncate tracking-tight uppercase italic max-w-[400px]">
                                {module.title}
                            </h3>
                            <div className="flex items-center gap-5 mt-3 text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">
                                <span className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-xl border border-white/5 shadow-inner group-hover:text-gray-400 transition-colors">
                                    <Calendar className="w-4 h-4 text-secondary-500" />
                                    {module.release_date ? new Date(module.release_date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : module.month}
                                </span>
                                <span className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 rounded-xl border border-white/5 shadow-inner group-hover:text-gray-400 transition-colors">
                                    <Clock className="w-4 h-4 text-primary-500" />
                                    {module.total_duration || 0} min
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 p-2 bg-slate-950/50 rounded-[1.5rem] border border-white/10 shadow-2xl backdrop-blur-sm self-end xl:self-start">
                        <button
                            onClick={() => onTogglePublish(module)}
                            className={`p-3.5 rounded-2xl transition-all shadow-xl ${module.is_published
                                ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20'
                                : 'bg-slate-800/50 text-gray-500 hover:text-white hover:bg-slate-800 border border-white/5'}`}
                            title={module.is_published ? 'Desactivar Módulo' : 'Activar Módulo'}
                        >
                            {module.is_published ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => onEditModule(module)}
                            className="p-3.5 bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-800 rounded-2xl transition-all border border-white/5 shadow-xl group/btn"
                            title="Ajustes Estratégicos"
                        >
                            <Edit2 className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={() => onDeleteModule(module)}
                            className="p-3.5 bg-slate-800/50 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-white/5 shadow-xl group/btn"
                            title="Eliminar del Registro"
                        >
                            <Trash2 className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 group-hover:text-gray-400 transition-colors line-clamp-2 min-h-[3rem] font-medium tracking-wide">
                    {module.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/5">
                    <div className="flex gap-4">
                        <div className="px-6 py-3 bg-slate-950 rounded-[1.5rem] border border-white/10 text-center shadow-lg group-hover:border-white/20 transition-all">
                            <p className="text-[10px] uppercase text-gray-600 font-black tracking-[0.2em] leading-none mb-1.5">Unidades</p>
                            <p className="text-white font-black text-lg">{module.total_lessons || 0}</p>
                        </div>
                        <div className="px-6 py-3 bg-primary-500/5 rounded-[1.5rem] border border-primary-500/20 text-center shadow-lg group-hover:border-primary-500/30 transition-all">
                            <p className="text-[10px] uppercase text-primary-500 font-black tracking-[0.2em] leading-none mb-1.5">Capacidad</p>
                            <p className="text-primary-400 font-black text-lg">{module.points_to_earn || 0}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onToggleExpansion(module.id)}
                        className={`group/admin flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all border shadow-2xl active:scale-95 ${
                            isExpanded
                            ? 'bg-primary-500 text-white border-primary-500 shadow-primary-500/30'
                            : 'bg-slate-950 border-white/10 text-gray-500 hover:border-primary-500/50 hover:text-white hover:bg-slate-900 group-hover:translate-x-2'
                        }`}
                    >
                        {isExpanded ? 'Cerrar Registro' : 'Administrar Módulo'}
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover/admin:translate-y-0.5 transition-transform" />}
                    </button>
                </div>
            </div>

            {/* Expanded Content Section */}
            {isExpanded && (
                <div className="px-6 pb-12 md:px-10 md:pb-16 pt-4 space-y-10">
                    <ModuleLessons 
                        lessons={lessons}
                        onNewLesson={() => onNewLesson(module.id)}
                        onEditLesson={(lesson) => onEditLesson(module.id, lesson)}
                        onDeleteLesson={(lesson) => onDeleteLesson(lesson)}
                        onToggleOptional={onToggleLessonOptional}
                        onOpenEditor={onOpenLessonEditor}
                        loading={contentLoading}
                    />

                    <ModuleResources 
                        resources={resources}
                        onNewResource={() => onNewResource(module.id)}
                        onEditResource={(res) => onEditResource(module.id, res)}
                        onDeleteResource={(res) => onDeleteResource(res)}
                    />
                </div>
            )}
        </div>
    );
}
