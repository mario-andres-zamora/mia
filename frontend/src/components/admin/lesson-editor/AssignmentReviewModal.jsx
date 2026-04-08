import { Upload, AlertTriangle, FileText } from 'lucide-react';

export default function AssignmentReviewModal({ 
    isOpen, 
    onClose, 
    assignment, 
    submissions, 
    onGrade, 
    apiUrl 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-4xl bg-[#0f1425] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-white/5 bg-slate-900/50 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-4 tracking-tighter uppercase">
                            <div className="p-2 bg-green-500/20 rounded-xl">
                                <Upload className="w-7 h-7 text-green-400" />
                            </div>
                            Auditoría de <span className="text-green-400">Entregas</span>
                        </h2>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Revisión de la tarea: {assignment.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white">✕</button>
                </div>

                <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-6">
                    {submissions.length === 0 ? (
                        <div className="text-center py-20 bg-slate-900/20 rounded-[2.5rem] border border-white/5 border-dashed flex flex-col items-center">
                            <div className="p-5 bg-slate-800/40 rounded-full mb-4">
                                <AlertTriangle className="w-12 h-12 text-gray-700" />
                            </div>
                            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Sin entregas por el momento</p>
                        </div>
                    ) : (
                        submissions.map((sub) => (
                            <div key={sub.id} className="p-6 bg-slate-900/40 border border-white/5 rounded-[2.5rem] flex flex-col lg:flex-row gap-8 hover:bg-slate-900 transition-all group">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-white text-lg">
                                            {sub.first_name[0]}{sub.last_name[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black uppercase tracking-tight text-lg">{sub.first_name} {sub.last_name}</h4>
                                            <span className="text-[10px] text-gray-600 font-bold">{sub.email}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-md border ${
                                            sub.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-lg shadow-green-500/5' :
                                            sub.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-lg shadow-red-500/5' :
                                            'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-lg shadow-blue-500/5'
                                        }`}>
                                            {sub.status === 'approved' ? 'Estatus: Validado' : sub.status === 'rejected' ? 'Estatus: Rechazado' : 'Estatus: Pendiente'}
                                        </span>
                                        <div className="w-1 h-1 bg-white/5 rounded-full"></div>
                                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Enviado: {new Date(sub.submitted_at).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex">
                                        <a 
                                            href={`${apiUrl.replace('/api', '')}${sub.file_url}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="group/btn inline-flex items-center gap-3 px-5 py-2.5 bg-slate-950 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:border-primary-500/30 transition-all shadow-xl"
                                        >
                                            <FileText className="w-4 h-4 text-gray-600 group-hover/btn:text-primary-400" /> Auditoría de Material
                                        </a>
                                    </div>
                                </div>

                                <div className="w-full lg:w-80 space-y-4 bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] block ml-1">Observaciones Técnicas</label>
                                        <textarea
                                            className="w-full bg-slate-900 border-white/5 focus:border-primary-500 rounded-2xl p-4 text-xs text-gray-400 font-medium outline-none border transition-all h-24 placeholder:text-gray-800"
                                            placeholder="Añadir feedback para el alumno..."
                                            defaultValue={sub.feedback || ''}
                                            id={`feedback-${sub.id}`}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onGrade(sub.id, 'approved', 100, document.getElementById(`feedback-${sub.id}`).value)}
                                            className="flex-1 py-3 text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-500 border border-green-500/10 rounded-xl hover:bg-green-500 hover:text-white transition-all active:scale-95"
                                        >
                                            Validar
                                        </button>
                                        <button
                                            onClick={() => onGrade(sub.id, 'rejected', 0, document.getElementById(`feedback-${sub.id}`).value)}
                                            className="flex-1 py-3 text-[9px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
