import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    Search,
    Filter,
    BookOpen,
    User,
    Calendar,
    ChevronLeft,
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

export default function AdminInteractions() {
    const navigate = useNavigate();
    const {
        interactions,
        loading,
        filters,
        updateFilter,
        uniqueModules,
        uniqueLessons
    } = useInteractions();

    const [activeTab, setActiveTab] = useState('all');
    const [viewMode, setViewMode] = useState('detail'); // 'detail' or 'stats'

    const handleExportCSV = () => {
        if (interactions.length === 0) return;

        const headers = ["Fecha", "Funcionario", "Email", "Modulo", "Leccion", "Actividad", "Tipo", "Respuesta"];
        const rows = interactions.map(item => {
            const resData = parseResponse(item.response_data);
            let answer = "";

            if (item.content_type === 'confirmation') {
                answer = `Opción #${resData.selectedOption}`;
            } else if (item.content_type === 'multiple_choice') {
                answer = resData.selectedOptions ? `Opciones: ${resData.selectedOptions.join(', ')}` : "Sin selección";
            } else if (item.content_type === 'password_tester') {
                answer = `Clave probada: ${resData.password} (${resData.score}/4)`;
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

    const typeFilters = [
        { id: 'all', label: 'Todas', icon: MessageSquare },
        { id: 'interactive_input', label: 'Texto', icon: Type },
        { id: 'multiple_choice', label: 'Opciones', icon: ListChecks },
        { id: 'security', label: 'Seguridad', icon: ShieldCheck }
    ];

    const finalInteractions = interactions.filter(item => {
        if (activeTab === 'all') return true;
        if (activeTab === 'security') return ['password_tester', 'mfa_defender'].includes(item.content_type);
        return item.content_type === activeTab;
    });

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
            <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 border border-white/5 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-emerald-500/10 transition-all duration-1000"></div>

                <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
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

                    <div className="flex items-center gap-4 bg-slate-950 p-1.5 rounded-2xl border border-white/5 shadow-inner">
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
                        className="btn-secondary px-6 flex items-center gap-2 group/export"
                    >
                        <Download className="w-4 h-4 text-emerald-500 group-hover/export:translate-y-0.5 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Exportar CSV</span>
                    </button>
                </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-white/5">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    {typeFilters.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-950 text-gray-500 hover:text-white border border-white/5'}`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div className="lg:col-span-6 space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 italic">Buscar por funcionario o actividad</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                value={filters.searchTerm}
                                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                                className="block w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                                placeholder="..."
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Módulo</label>
                        <select
                            value={filters.moduleId}
                            onChange={(e) => updateFilter('moduleId', e.target.value)}
                            className="block w-full bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none appearance-none cursor-pointer font-medium"
                        >
                            <option value="">Todos</option>
                            {uniqueModules.map(m => (
                                <option key={m.id} value={m.id}>{m.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="lg:col-span-3 space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Lección</label>
                        <select
                            value={filters.lessonId}
                            onChange={(e) => updateFilter('lessonId', e.target.value)}
                            className="block w-full bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none appearance-none cursor-pointer font-medium"
                        >
                            <option value="">Todas</option>
                            {uniqueLessons.map(l => (
                                <option key={l.id} value={l.id}>{l.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {viewMode === 'stats' ? (
                <InteractionStats />
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {finalInteractions.length === 0 ? (
                        <div className="text-center py-40 bg-slate-900/30 rounded-[3rem] border border-white/5 border-dashed flex flex-col items-center justify-center">
                            <Inbox className="w-20 h-20 text-gray-800 mb-6" />
                            <h3 className="text-xl font-black text-gray-500 uppercase">Sin resultados para esta categoría</h3>
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
        </div>
    );
}
