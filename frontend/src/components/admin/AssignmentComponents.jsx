import { 
    ClipboardList, CheckCircle, XCircle, Clock, Search, Filter, FileText 
} from 'lucide-react';

export const AssignmentStats = ({ stats }) => (
    <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-2xl border border-white/5 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-default">
        <div className="flex flex-col text-center px-4">
            <span className="text-yellow-400 font-bold text-xl">{stats.pending}</span>
            <span className="text-[10px] uppercase font-black text-gray-500 tracking-wider">Pendientes</span>
        </div>
        <div className="w-px h-8 bg-white/10"></div>
        <div className="flex flex-col text-center px-4">
            <span className="text-white font-bold text-xl">{stats.total}</span>
            <span className="text-[10px] uppercase font-black text-gray-500 tracking-wider">Totales</span>
        </div>
    </div>
);

// Pattern: Compound Components (Skill Section 5)
// Allows for flexible UI composition while hiding state management details
export const AssignmentFilters = ({ children }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/20 p-4 rounded-3xl border border-white/5 backdrop-blur-sm shadow-inner group">
        {children}
    </div>
);

AssignmentFilters.Search = ({ value, onChange }) => (
    <div className="relative group-focus-within:ring-2 ring-primary-500/20 rounded-xl transition-all">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-primary-400 transition-colors" />
        <input
            type="text"
            placeholder="Buscar usuario o email..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary-500 outline-none placeholder:text-gray-600 font-medium"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

AssignmentFilters.Select = ({ icon: Icon, value, onChange, options, placeholder, accentColor = "primary" }) => {
    const accentClasses = {
        primary: "focus:border-primary-400",
        secondary: "focus:border-secondary-500",
        pink: "focus:border-pink-500"
    };

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icon className="w-4 h-4 text-gray-500" />
            </div>
            <select
                className={`w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white appearance-none outline-none cursor-pointer font-medium hover:border-white/20 transition-all ${accentClasses[accentColor]}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="all">{placeholder}</option>
                {options.map(opt => (
                    <option key={`opt-${opt.id}`} value={opt.id}>{opt.label}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">▼</div>
        </div>
    );
};

export const SubmissionCard = ({ sub, onOpenEvaluate }) => {
    const statusConfig = {
        approved: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', icon: CheckCircle, label: 'Aprobado' },
        rejected: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', icon: XCircle, label: 'Rechazado' },
        pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', icon: Clock, label: 'Pendiente' }
    };
    
    const config = statusConfig[sub.status] || statusConfig.pending;
    const Icon = config.icon;

    return (
        <div className="group p-6 bg-slate-800/40 border border-white/5 rounded-3xl hover:bg-slate-800/60 hover:border-white/10 transition-all flex flex-col lg:flex-row gap-6 items-start lg:items-center relative overflow-hidden">
            {/* Glow Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${config.bg.replace('/10', '/5')} blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            
            {/* User Info */}
            <div className="flex-shrink-0 w-full lg:w-64">
                <h3 className="text-white font-bold group-hover:text-primary-400 transition-colors uppercase tracking-tight">{sub.first_name} {sub.last_name}</h3>
                <p className="text-sm text-gray-400 font-medium">{sub.email}</p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500 uppercase font-black tracking-widest bg-black/20 w-fit px-2 py-0.5 rounded-md">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(sub.submitted_at).toLocaleString()}
                </div>
            </div>

            {/* Assignment Info */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1.5 mb-2">
                    <span className="text-[10px] bg-slate-900/80 text-primary-400 px-3 py-1 rounded-lg uppercase font-black truncate border border-primary-500/10 inline-block w-fit tracking-wider">
                        Módulo: {sub.module_title}
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold truncate tracking-widest pl-1">
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
                    className="btn-secondary whitespace-nowrap w-full lg:w-auto justify-center group/btn relative overflow-hidden font-black text-[10px] uppercase tracking-widest px-6 py-2.5"
                >
                    Evaluar Entrega
                </button>
            </div>
        </div>
    );
};

export const EvaluationModal = ({ gradingSubmission, gradeData, setGradeData, onClose, onSubmit, API_URL }) => {
    if (!gradingSubmission) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="card w-full max-w-2xl bg-gradient-to-b from-[#1b2341] to-[#0a0f1e] border-slate-700/50 p-0 overflow-hidden shadow-[0_0_50px_-12px_rgba(30,58,138,0.5)] animate-fade-in-up">
                <div className="p-6 border-b border-white/5 bg-slate-900/50 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary-500/5 pointer-events-none"></div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-3 z-10">
                        <div className="p-2 bg-pink-500/20 rounded-xl">
                            <ClipboardList className="w-5 h-5 text-pink-400" />
                        </div>
                        Revisar Tarea
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center z-10"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Student Info Card */}
                    <div className="flex gap-4 p-5 bg-slate-900/60 rounded-3xl border border-white/5 shadow-inner">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/30 to-secondary-500/10 flex items-center justify-center text-primary-300 font-black text-2xl uppercase shrink-0 border border-white/5 shadow-lg">
                            {gradingSubmission.first_name[0]}{gradingSubmission.last_name[0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-black text-xl tracking-tight leading-none mb-1">{gradingSubmission.first_name} {gradingSubmission.last_name}</p>
                            <p className="text-gray-400 text-sm font-medium mb-3">{gradingSubmission.email}</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[9px] text-primary-400 uppercase font-black bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/10">{gradingSubmission.module_title}</span>
                                <span className="text-[9px] text-gray-500 uppercase font-black bg-white/5 px-2 py-0.5 rounded border border-white/5">{gradingSubmission.lesson_title}</span>
                            </div>
                        </div>
                    </div>

                    {/* File Download / View Section */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest pl-1">Documento Entregado</label>
                        <a
                            href={`${API_URL.replace('/api', '')}${gradingSubmission.file_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-5 bg-slate-800/40 rounded-3xl border border-white/10 hover:border-primary-500/50 hover:bg-slate-800/80 transition-all group active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform bg-gradient-to-br from-blue-500/30 to-blue-600/10">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg group-hover:text-primary-400 transition-colors">Abrir para Revisión</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Subido el {new Date(gradingSubmission.submitted_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-black bg-white/5 px-4 py-2 rounded-xl text-gray-400 uppercase tracking-widest border border-white/5 group-hover:bg-primary-500 group-hover:text-white transition-all">Ver PDF/Imagen</div>
                        </a>
                    </div>

                    {/* Feedback Form */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                        <div className="space-y-3">
                            <div className="flex justify-between items-end pr-1">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Puntaje / Nota</label>
                                <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Base 100</span>
                            </div>
                            <input 
                                type="number" 
                                min="0" max="100"
                                className="input-field bg-slate-900/60 border-white/10 text-xl font-black text-center text-primary-400 focus:ring-primary-500"
                                value={gradeData.grade}
                                onChange={(e) => setGradeData({ ...gradeData, grade: parseInt(e.target.value) || 0 })}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest pl-1">Observaciones</label>
                            <textarea
                                className="input-field bg-slate-900/60 border-white/10 min-h-[120px] text-sm text-gray-300 transition-all focus:min-h-[160px]"
                                rows="3"
                                placeholder="Indica al estudiante qué puntos debe mejorar o las fortalezas de su trabajo..."
                                value={gradeData.feedback}
                                onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                            />
                        </div>

                        {gradingSubmission.status !== 'pending' && (
                            <div className="px-4 py-3 bg-yellow-500/5 rounded-2xl border border-yellow-500/10 flex items-center justify-between">
                                <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">🚧 Esta tarea ya tiene calificación</p>
                                <span className="text-[10px] text-white font-black bg-yellow-500/20 px-3 py-1 rounded-full uppercase">{gradingSubmission.status === 'approved' ? 'Aprobado' : 'Rechazado'}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Actions */}
                <div className="p-8 bg-slate-900/80 border-t border-white/10 flex gap-4 backdrop-blur-sm">
                    <button
                        onClick={() => onSubmit('rejected')}
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-6 rounded-3xl font-black text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-inner active:scale-95 group"
                    >
                        <XCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] uppercase tracking-tighter">Rechazar Entrega</span>
                    </button>
                    <button
                        onClick={() => onSubmit('approved')}
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-6 rounded-3xl font-black text-green-500 bg-green-500/5 border border-green-500/10 hover:bg-green-500 hover:text-white transition-all shadow-xl active:scale-95 group shadow-green-500/5"
                    >
                        <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] uppercase tracking-tighter">Aprobar y Guardar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
