import { LayoutGrid, Plus, BookOpen, CheckCircle2, EyeOff, Calendar } from 'lucide-react';

export default function AdminModulesHeader({ totalModules, publishedModules, draftModules, onNewModule }) {
    return (
        <div className="space-y-6">
            {/* Header section with glassmorphism */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-8 border border-white/5 backdrop-blur-md shadow-2xl">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl opacity-50"></div>
                
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary-500/20 rounded-lg text-primary-400">
                                <LayoutGrid className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">Gestión de Módulos</h1>
                        </div>
                        <p className="text-gray-400 max-w-lg">
                            Control total sobre el currículo educativo de <span className="text-primary-400 font-bold">CGR Segur@</span>. 
                            Crea, edita y organiza el contenido de aprendizaje aquí.
                        </p>
                    </div>
                    <button
                        onClick={onNewModule}
                        className="btn-primary group flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-primary-500/50 hover:-translate-y-1"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        NUEVO MÓDULO
                    </button>
                </div>
            </div>

            {/* Stats Grid - High Density */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Módulos', value: totalModules, icon: BookOpen, color: 'primary' },
                    { label: 'Publicados', value: publishedModules, icon: CheckCircle2, color: 'emerald' },
                    { label: 'En Borrador', value: draftModules, icon: EyeOff, color: 'slate' },
                    { label: 'Próximo Lanzamiento', value: 'N/A', icon: Calendar, color: 'secondary' }
                ].map((stat, idx) => (
                    <div key={idx} className="card bg-slate-900/40 border-white/5 p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
                        <div className={`p-3 rounded-2xl bg-${stat.color === 'emerald' ? 'emerald' : stat.color === 'secondary' ? 'secondary' : stat.color === 'slate' ? 'slate' : 'primary'}-500/10 text-${stat.color === 'emerald' ? 'emerald' : stat.color === 'secondary' ? 'secondary' : stat.color === 'slate' ? 'slate' : 'primary'}-500 shadow-inner`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</p>
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
