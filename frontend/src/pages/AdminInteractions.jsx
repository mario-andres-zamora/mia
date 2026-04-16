import React from 'react';
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
    Download
} from 'lucide-react';
import { useInteractions } from '../hooks/useInteractions';

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

    const handleExportCSV = () => {
        if (interactions.length === 0) return;

        // Header for the CSV
        const headers = ["Fecha", "Funcionario", "Email", "Modulo", "Leccion", "Actividad", "Tipo", "Respuesta"];

        // Map data to rows
        const rows = interactions.map(item => {
            const resData = parseResponse(item.response_data);
            const answer = item.content_type === 'confirmation'
                ? `Opción #${resData.selectedOption}`
                : (resData.answer || "").replace(/"/g, '""').replace(/\n/g, ' '); // Escape quotes and newlines

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

        // Combine for full CSV content
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

        // Create download link
        const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Interacciones_LMS_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                <div>
                    <p className="text-[12px] font-black uppercase text-white tracking-[0.4em] mb-1">Cargando Reflexiones</p>
                    <p className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.2em] italic">Sincronizando aportes de los usuarios...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-24 px-4 md:px-0">
            {/* Header section with specialized style */}
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
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{interactions.length} Respuestas hoy</span>
                            </div>
                            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Respuestas de <span className="text-emerald-500">Texto</span></h1>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleExportCSV}
                            disabled={interactions.length === 0}
                            className="btn-secondary px-6 flex items-center gap-2 group/export disabled:opacity-50"
                        >
                            <Download className="w-4 h-4 text-emerald-500 group-hover/export:translate-y-0.5 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Exportar CSV</span>
                        </button>

                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Total acumulado</span>
                            <span className="text-3xl font-black text-white">{interactions.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Filter Section */}
            <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div className="lg:col-span-5 space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Búsqueda rápida</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={filters.searchTerm}
                                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                                className="block w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all font-medium"
                                placeholder="Buscar por funcionario, correo o lección..."
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Módulo</label>
                        <div className="relative">
                            <select
                                value={filters.moduleId}
                                onChange={(e) => updateFilter('moduleId', e.target.value)}
                                className="block w-full bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 appearance-none cursor-pointer transition-all font-medium"
                            >
                                <option value="">Todos los Módulos</option>
                                {uniqueModules.map(m => (
                                    <option key={m.id} value={m.id}>{m.title}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                                <Filter className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Lección</label>
                        <div className="relative">
                            <select
                                value={filters.lessonId}
                                onChange={(e) => updateFilter('lessonId', e.target.value)}
                                className="block w-full bg-slate-950 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/40 appearance-none cursor-pointer transition-all font-medium"
                            >
                                <option value="">Todas las Lecciones</option>
                                {uniqueLessons.map(l => (
                                    <option key={l.id} value={l.id}>{l.title}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                                <BookOpen className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* List of Interactions */}
            <div className="space-y-6">
                {interactions.length === 0 ? (
                    <div className="text-center py-40 bg-slate-900/30 rounded-[3rem] border border-white/5 border-dashed flex flex-col items-center justify-center group hover:bg-slate-900/50 transition-all duration-700">
                        <div className="relative mb-10">
                            <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full scale-150 animate-pulse"></div>
                            <div className="relative p-10 bg-slate-950 rounded-full border border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
                                <Inbox className="w-20 h-20 text-gray-700 group-hover:text-emerald-500/30 transition-colors" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-gray-300 mb-2 uppercase italic">No hay respuestas de texto</h3>
                        <p className="text-[11px] text-gray-600 max-w-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">
                            Aún no se han registrado interacciones de este tipo en los módulos seleccionados.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {interactions.map((item) => {
                            const resData = parseResponse(item.response_data);
                            const interactionType = item.content_type;

                            return (
                                <div
                                    key={item.id}
                                    className="group relative bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 rounded-[2.5rem] p-8 transition-all duration-500 shadow-lg hover:shadow-emerald-500/5 animate-fade-in-up"
                                >
                                    <div className="flex flex-col md:flex-row gap-8">
                                        {/* Left Side: Metadata & User */}
                                        <div className="md:w-1/3 flex flex-col gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white/10 group-hover:scale-105 transition-transform">
                                                    {item.first_name?.[0]}{item.last_name?.[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-white uppercase tracking-tight leading-none mb-1 group-hover:text-emerald-400 transition-colors">
                                                        {item.first_name} {item.last_name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 font-medium truncate mb-2">{item.email}</p>
                                                    <div className="flex items-center gap-2">
                                                        {interactionType === 'confirmation' ? (
                                                            <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase flex items-center gap-1">
                                                                <CheckCircle2 className="w-3 h-3" /> Confirmación
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-black uppercase flex items-center gap-1">
                                                                <Type className="w-3 h-3" /> Reflexión Escritura
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-4 border-t border-white/5">
                                                <div className="flex items-start gap-3">
                                                    <BookOpen className="w-4 h-4 text-emerald-500/50 flex-shrink-0 mt-0.5" />
                                                    <div className="text-[10px] leading-relaxed">
                                                        <span className="block font-black text-gray-500 uppercase tracking-widest mb-1 italic">{item.module_title}</span>
                                                        <span className="text-gray-300 font-bold uppercase">{item.lesson_title}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-4 h-4 text-emerald-500/50" />
                                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                        {new Date(item.completed_at).toLocaleDateString('es-ES', {
                                                            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: The actual Content */}
                                        <div className="flex-1 relative">
                                            <div className="absolute -top-4 -left-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                                <Quote className="w-20 h-20 text-emerald-500 fill-emerald-500" />
                                            </div>

                                            <div className="relative h-full flex flex-col">
                                                <div className="mb-4">
                                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 italic">Título de la actividad:</p>
                                                    <h4 className="text-sm font-bold text-white uppercase">{item.content_title}</h4>
                                                </div>

                                                <div className="flex-1 p-6 rounded-3xl bg-black/40 border border-white/5 shadow-inner relative group-hover:border-emerald-500/20 transition-colors">
                                                    {interactionType === 'confirmation' ? (
                                                        <div className="flex flex-col gap-2">
                                                            <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Opción Seleccionada:</span>
                                                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-black uppercase text-[11px] inline-block self-start">
                                                                OPCIÓN #{resData.selectedOption || 'N/A'}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-lg text-gray-300 font-medium leading-relaxed italic pr-6 italic-not">
                                                            "{resData.answer || 'Sin respuesta técnica'}"
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
