import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    BookOpen,
    User,
    Calendar,
    ChevronLeft,
    ChevronDown,
    Inbox,
    Quote,
    Type,
    CheckCircle2,
    Download,
    ListChecks,
    ShieldCheck,
    Lock,
    LayoutGrid,
    PieChart as PieIcon
} from 'lucide-react';
import { useInteractions } from '../hooks/useInteractions';
import InteractionStats from '../components/admin/InteractionStats';

const parseResponse = (data) => {
    if (!data) return {};
    if (typeof data === 'object') return data;
    try {
        return JSON.parse(data);
    } catch (e) {
        return { answer: data };
    }
};

const PremiumSelect = ({ value, onChange, options, placeholder, label, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => String(opt.value) === String(value)) || { label: placeholder, value: '' };

    return (
        <div className="relative w-full md:w-64 z-[100]">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full flex items-center justify-between bg-slate-950 border rounded-2xl py-4 px-6 text-sm text-white transition-all duration-300 group focus:outline-none shadow-2xl ${disabled ? 'opacity-30 cursor-not-allowed border-white/5' :
                        isOpen ? 'border-emerald-500/50 ring-4 ring-emerald-500/10' : 'border-white/10 hover:border-white/20'
                    }`}
            >
                <div className="flex flex-col items-start text-left max-w-[85%]">
                    <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1">{label}</span>
                    <span className="truncate w-full font-bold tracking-tight text-sm">{selectedOption.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 text-gray-500 transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-emerald-500' : 'group-hover:text-gray-300'}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute top-[calc(100%+0.5rem)] w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="py-2 max-h-64 overflow-y-auto custom-scrollbar">
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-6 py-4 text-[11px] transition-all flex items-center justify-between group/item ${String(value) === String(opt.value)
                                            ? 'bg-emerald-500/10 text-emerald-400 font-black'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white font-bold'
                                        }`}
                                >
                                    <span className="uppercase tracking-wider truncate mr-2">{opt.label}</span>
                                    {String(value) === String(opt.value) ? (
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                                    ) : (
                                        <div className="w-1 h-1 rounded-full bg-white/5 group-hover/item:bg-white/20 transition-colors"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default function AdminInteractions() {
    const navigate = useNavigate();
    const {
        interactions,
        loading,
        filters,
        updateFilter,
        uniqueModules,
        uniqueLessons,
        uniqueContents
    } = useInteractions();

    const [viewMode, setViewMode] = useState('detail'); // 'detail' or 'stats'

    const handleExportCSV = () => {
        const dataToExport = (!filters.moduleId || !filters.lessonId || !filters.contentId) ? [] : interactions;
        
        if (dataToExport.length === 0) return;

        const headers = ["Fecha", "Funcionario", "Email", "Modulo", "Leccion", "Actividad", "Tipo", "Respuesta"];
        const rows = dataToExport.map(item => {
            const resData = parseResponse(item.response_data);
            let answer = "";

            if (item.content_type === 'confirmation') {
                answer = `Opción #${resData.selectedOption}`;
            } else if (item.content_type === 'multiple_choice') {
                answer = resData.selectedOptions ? `Opciones: ${resData.selectedOptions.join(', ')}` : "Sin selección";
            } else if (item.content_type === 'password_tester') {
                answer = `Clave probada: ${resData.password} (${resData.score}/4)`;
            } else if (item.content_type === 'categorization') {
                answer = `Categorizado Correctamente (Feedback: ${resData.feedback})`;
            } else {
                answer = (resData.answer || "").replace(/"/g, '""').replace(/\n/g, ' ');
            }

            return [
                new Date(item.completed_at).toLocaleDateString(),
                `"${item.first_name} ${item.last_name}"`,
                item.email,
                `"${item.module_title}"`,
                `"${item.lesson_title}"`,
                `"${item.content_title}"`,
                item.content_type,
                `"${answer}"`
            ];
        });

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Interacciones_LMS_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const finalInteractions = interactions;

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh] gap-6 animate-fade-in text-center">
                <div className="relative">
                    <div className="w-24 h-24 border-[6px] border-emerald-500/10 rounded-full shadow-2xl"></div>
                    <div className="absolute inset-0 w-24 h-24 border-[6px] border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <MessageSquare className="w-8 h-8 text-emerald-500 animate-pulse" />
                    </div>
                </div>
                <p className="text-[12px] font-black uppercase text-white tracking-[0.4em]">Cargando Resultados</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-24 px-4 md:px-0">
            {/* Header with Filters Integrated */}
            <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 border border-white/5 shadow-2xl overflow-visible group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-emerald-500/10 transition-all duration-1000 pointer-events-none"></div>

                <div className="relative flex flex-col gap-8">
                    {/* Top Row: Back, Title, Mode, Export */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 text-center md:text-left">
                            <button
                                onClick={() => navigate('/admin')}
                                className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center transition-all group/back active:scale-90"
                            >
                                <ChevronLeft className="w-6 h-6 text-white group-hover/back:-translate-x-1 transition-transform" />
                            </button>
                            <div>
                                <div className="flex items-center gap-3 mb-1 justify-center md:justify-start">
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-emerald-500/20">Interacciones</span>
                                    {viewMode === 'detail' && (
                                        <>
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{finalInteractions.length} Registros</span>
                                        </>
                                    )}
                                </div>
                                <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Monitoreo de <span className="text-emerald-500">Actividades</span></h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                                <button
                                    onClick={() => setViewMode('detail')}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'detail' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-500 hover:text-white'}`}
                                >
                                    <LayoutGrid className="w-4 h-4 inline-block mr-2 -mt-0.5" />
                                    Detalle
                                </button>
                                <button
                                    onClick={() => setViewMode('stats')}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'stats' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-500 hover:text-white'}`}
                                >
                                    <PieIcon className="w-4 h-4 inline-block mr-2 -mt-0.5" />
                                    Gráficos
                                </button>
                            </div>

                            <button
                                onClick={handleExportCSV}
                                disabled={!filters.moduleId || !filters.lessonId || !filters.contentId}
                                className={`px-6 py-2.5 flex items-center gap-2 rounded-2xl border transition-all group/export ${
                                    (!filters.moduleId || !filters.lessonId || !filters.contentId)
                                    ? 'bg-slate-900/50 text-gray-700 border-white/5 cursor-not-allowed opacity-50'
                                    : 'btn-secondary text-white hover:border-emerald-500/50'
                                }`}
                            >
                                <Download className={`w-4 h-4 transition-transform ${(!filters.moduleId || !filters.lessonId || !filters.contentId) ? 'text-gray-700' : 'text-emerald-500 group-hover/export:translate-y-0.5'}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Exportar CSV</span>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Row: Premium Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5">

                        <PremiumSelect
                            label="Módulo"
                            placeholder="Seleccione un módulo"
                            value={filters.moduleId}
                            onChange={(val) => updateFilter('moduleId', val)}
                            options={[
                                { label: 'Seleccione un módulo', value: '' },
                                ...uniqueModules.map(m => ({ label: m.title, value: m.id }))
                            ]}
                        />

                        <PremiumSelect
                            label="Lección"
                            placeholder="Seleccione una lección"
                            value={filters.lessonId}
                            onChange={(val) => updateFilter('lessonId', val)}
                            options={[
                                { label: 'Seleccione una lección', value: '' },
                                ...uniqueLessons.map(l => ({ label: l.title, value: l.id }))
                            ]}
                            disabled={!filters.moduleId}
                        />

                        <PremiumSelect
                            label="Actividad"
                            placeholder="Seleccione una actividad"
                            value={filters.contentId}
                            onChange={(val) => updateFilter('contentId', val)}
                            options={[
                                { label: 'Seleccione una actividad', value: '' },
                                ...uniqueContents.map(c => ({ label: c.title, value: c.id }))
                            ]}
                            disabled={!filters.lessonId}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {!filters.moduleId ? (
                    <div className="py-40 text-center bg-slate-900/20 rounded-[3.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-emerald-500/5 rounded-full flex items-center justify-center mb-8 border border-emerald-500/10">
                            <BookOpen className="w-10 h-10 text-emerald-500/40" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2 italic">Seleccione un <span className="text-emerald-500">Módulo</span></h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Debe elegir un módulo para comenzar</p>
                    </div>
                ) : !filters.lessonId ? (
                    <div className="py-40 text-center bg-slate-900/20 rounded-[3.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-emerald-500/5 rounded-full flex items-center justify-center mb-8 border border-emerald-500/10">
                            <Calendar className="w-10 h-10 text-emerald-500/40" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2 italic">Seleccione una <span className="text-emerald-500">Lección</span></h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Elija la lección de la cual desea ver resultados</p>
                    </div>
                ) : !filters.contentId ? (
                    <div className="py-40 text-center bg-slate-900/20 rounded-[3.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-emerald-500/5 rounded-full flex items-center justify-center mb-8 border border-emerald-500/10">
                            <MessageSquare className="w-10 h-10 text-emerald-500/40" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2 italic">Seleccione una <span className="text-emerald-500">Actividad</span></h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Elija la actividad específica para visualizar las interacciones</p>
                    </div>
                ) : (
                    <>
                        {viewMode === 'stats' ? (
                            <InteractionStats filters={filters} />
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {finalInteractions.length === 0 ? (
                                    <div className="text-center py-40 bg-slate-900/30 rounded-[3rem] border border-white/5 border-dashed flex flex-col items-center justify-center">
                                        <Inbox className="w-20 h-20 text-gray-800 mb-6" />
                                        <h3 className="text-xl font-black text-gray-500 uppercase italic">Sin resultados para esta selección</h3>
                                    </div>
                                ) : (
                                    finalInteractions.map((item) => {
                                        const resData = parseResponse(item.response_data);
                                        return (
                                            <div key={item.id} className="group relative bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 rounded-[2.5rem] p-8 transition-all duration-500 shadow-lg">
                                                <div className="flex flex-col md:flex-row gap-8">
                                                    <div className="md:w-1/3 flex flex-col gap-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-emerald-500 font-black text-xl border border-white/10 group-hover:border-emerald-500 transition-colors">
                                                                {item.first_name?.[0]}{item.last_name?.[0]}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-black text-white uppercase tracking-tight leading-none mb-1 group-hover:text-emerald-400 transition-colors">
                                                                    {item.first_name} {item.last_name}
                                                                </h3>
                                                                <p className="text-[10px] text-gray-500 font-bold uppercase truncate">{item.email}</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                                            <div className="flex items-start gap-3">
                                                                <BookOpen className="w-4 h-4 text-emerald-500/50 flex-shrink-0 mt-0.5" />
                                                                <div className="text-[10px] leading-relaxed">
                                                                    <span className="block font-black text-gray-600 uppercase tracking-widest mb-1 italic">{item.module_title}</span>
                                                                    <span className="text-gray-300 font-black uppercase">{item.lesson_title}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <Calendar className="w-4 h-4 text-emerald-500/50" />
                                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{new Date(item.completed_at).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 relative">
                                                        <div className="relative h-full flex flex-col">
                                                            <div className="mb-4 flex items-center justify-between">
                                                                <div>
                                                                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1 italic">Contenido:</p>
                                                                    <h4 className="text-xs font-black text-white uppercase">{item.content_title}</h4>
                                                                </div>
                                                                <span className="px-3 py-1 bg-slate-950 rounded-lg text-[8px] font-black text-gray-500 uppercase border border-white/5">
                                                                    {item.content_type}
                                                                </span>
                                                            </div>

                                                            <div className="flex-1 p-6 rounded-3xl bg-black/40 border border-white/5 shadow-inner">
                                                                {item.content_type === 'multiple_choice' ? (
                                                                    <div className="space-y-4">
                                                                        <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Opción seleccionada:</p>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            <span className="px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-black uppercase rounded-2xl shadow-lg shadow-emerald-500/5">
                                                                                {resData.text ? (
                                                                                    resData.text
                                                                                ) : (
                                                                                    `Opción ${resData.selectedIndex !== undefined ? resData.selectedIndex + 1 : '?'}`
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ) : item.content_type === 'password_tester' ? (
                                                                    <div className="space-y-2">
                                                                        <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Prueba de Seguridad:</p>
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-center gap-3">
                                                                                <Lock className="w-4 h-4 text-emerald-500" />
                                                                                <span className="text-lg font-mono text-white tracking-widest">••••••••</span>
                                                                            </div>
                                                                            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${resData.score >= 3 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                                                Fortaleza: {resData.score}/4
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : item.content_type === 'categorization' ? (
                                                                    <div className="space-y-4">
                                                                        <div className="flex items-center justify-between">
                                                                            <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Actividad de Categorización:</p>
                                                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${resData.feedback === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                                                {resData.feedback === 'success' ? 'Éxito' : 'Error'}
                                                                            </span>
                                                                        </div>
                                                                        <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                                                                            <p className="text-[11px] text-gray-400 font-medium italic">
                                                                                El usuario completó la actividad de clasificación el {resData.completed_at ? new Date(resData.completed_at).toLocaleString() : 'N/A'}.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-lg text-gray-300 font-medium italic">"{resData.answer || 'Sin respuesta'}"</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                        )}
                    </div>
                )}
            </>
        )}
    </div>
</div>
    );
}
