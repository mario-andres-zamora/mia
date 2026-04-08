import { useNavigate } from 'react-router-dom';
import { 
    ClipboardList, 
    Inbox, 
    Filter, 
    Table, 
    GraduationCap
} from 'lucide-react';
import { useAssignments } from '../hooks/useAssignments';

// Modular Components
import AssignmentHeader from '../components/admin/assignments/AssignmentHeader';
import AssignmentStatsGrid from '../components/admin/assignments/AssignmentStatsGrid';
import AssignmentFilters from '../components/admin/assignments/AssignmentFilters';
import SubmissionCard from '../components/admin/assignments/SubmissionCard';
import EvaluationModal from '../components/admin/assignments/EvaluationModal';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminAssignments() {
    const navigate = useNavigate();
    const {
        filteredSubmissions,
        loading,
        filters,
        updateFilter,
        uniqueModules,
        uniqueLessons,
        stats,
        gradingActions
    } = useAssignments(true);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh] gap-6 animate-fade-in text-center">
                <div className="relative">
                    <div className="w-24 h-24 border-[6px] border-primary-500/10 rounded-full shadow-2xl"></div>
                    <div className="absolute inset-0 w-24 h-24 border-[6px] border-primary-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-primary-500 animate-pulse" />
                    </div>
                </div>
                <div>
                    <p className="text-[12px] font-black uppercase text-white tracking-[0.4em] mb-1">Mapeando Entregas</p>
                    <p className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em] italic">Sincronizando con base de datos académica...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fade-in max-w-7xl mx-auto pb-24 px-4 md:px-0">
            {/* Action Bar Header */}
            <AssignmentHeader 
                onBack={() => navigate('/admin')}
                pendingCount={stats.pending}
                totalCount={stats.total}
            />

            {/* Premium Stats Grid */}
            <AssignmentStatsGrid 
                pending={stats.pending}
                approved={filteredSubmissions.filter(s => s.status === 'approved').length}
                rejected={filteredSubmissions.filter(s => s.status === 'rejected').length}
            />

            {/* Filters Section */}
            <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                <div className="flex items-center gap-3 mb-8 text-left">
                    <Filter className="w-5 h-5 text-primary-500" />
                    <h3 className="text-sm font-black text-white uppercase tracking-widest underline decoration-2 decoration-primary-500 underline-offset-8">Refinar Resultados</h3>
                </div>
                
                <AssignmentFilters>
                    <AssignmentFilters.Search 
                        value={filters.searchTerm} 
                        onChange={(val) => updateFilter('searchTerm', val)} 
                    />
                    <AssignmentFilters.Select 
                        icon={Table}
                        placeholder="📑 Cualquier Estado"
                        value={filters.status}
                        onChange={(val) => updateFilter('status', val)}
                        options={[
                            { id: 'pending', label: '⏳ Pendientes de revisión' },
                            { id: 'approved', label: '✅ Aprobados' },
                            { id: 'rejected', label: '❌ Rechazados' }
                        ]}
                    />
                    <AssignmentFilters.Select 
                        icon={Inbox}
                        placeholder="📦 Todos los Módulos"
                        accentColor="secondary"
                        value={filters.moduleId}
                        onChange={(val) => updateFilter('moduleId', val)}
                        options={uniqueModules.map(m => ({ id: m.module_id, label: m.module_title }))}
                    />
                    <AssignmentFilters.Select 
                        icon={GraduationCap}
                        placeholder="🎓 Todas las Lecciones"
                        accentColor="pink"
                        value={filters.lessonId}
                        onChange={(val) => updateFilter('lessonId', val)}
                        options={uniqueLessons.map(l => ({ id: l.lesson_id, label: l.lesson_title }))}
                    />
                </AssignmentFilters>
            </div>

            {/* Submissions List Container */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center shadow-lg">
                            <ClipboardList className="w-5 h-5 text-primary-400" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-black text-white uppercase tracking-tighter italic">Entregas de Estudiantes</h2>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Filtrado inteligente activo</p>
                        </div>
                    </div>
                    <span className="px-6 py-2 bg-slate-900 border border-white/5 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest shadow-inner">
                        {filteredSubmissions.length} RESULTADOS
                    </span>
                </div>

                {filteredSubmissions.length === 0 ? (
                    <div className="text-center py-40 bg-slate-900/30 rounded-[3rem] border border-white/5 border-dashed flex flex-col items-center justify-center group hover:bg-slate-900/50 transition-all transition-duration-700">
                        <div className="relative mb-10">
                            <div className="absolute inset-0 bg-primary-500/10 blur-[60px] rounded-full scale-150 animate-pulse"></div>
                            <div className="relative p-10 bg-slate-950 rounded-full border border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
                                <Inbox className="w-20 h-20 text-gray-700 group-hover:text-primary-500/30 transition-colors" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-gray-300 mb-2 uppercase italic">Sin entregas por hoy</h3>
                        <p className="text-[11px] text-gray-600 max-w-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">
                            No se han encontrado registros que coincidan con los criterios de búsqueda. 
                            Intenta limpiar los filtros de módulo o lección.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 animate-stagger-in">
                        {filteredSubmissions.map((sub) => (
                            <SubmissionCard 
                                key={sub.id} 
                                sub={sub} 
                                onOpenEvaluate={gradingActions.open} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Evaluation Logic (Modal) */}
            <EvaluationModal 
                gradingSubmission={gradingActions.gradingSubmission}
                gradeData={gradingActions.gradeData}
                setGradeData={gradingActions.setGradeData}
                onClose={gradingActions.close}
                onSubmit={gradingActions.submit}
                API_URL={API_URL}
            />
        </div>
    );
}
