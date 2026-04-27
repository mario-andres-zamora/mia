import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ClipboardList,
    ChevronLeft,
    ChevronDown,
    Search,
    BarChart3,
    Users,
    Calendar,
    ArrowRight,
    Loader2,
    Inbox
} from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL;

const PremiumSelect = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || { label: placeholder, value: 'all' };

    return (
        <div className="relative w-full md:w-72 z-[100]">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between bg-slate-950 border rounded-2xl py-5 px-8 text-sm text-white transition-all duration-300 group focus:outline-none shadow-2xl ${isOpen ? 'border-teal-500/50 ring-4 ring-teal-500/10' : 'border-white/10 hover:border-white/20'
                    }`}
            >
                <div className="flex flex-col items-start text-left max-w-[85%]">
                    <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1">Filtrar por Módulo</span>
                    <span className="truncate w-full font-bold tracking-tight text-base">{selectedOption.label}</span>
                </div>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 text-gray-500 transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-teal-500' : 'group-hover:text-gray-300'}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute top-[calc(100%+0.75rem)] w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="py-3 max-h-80 overflow-y-auto custom-scrollbar">
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-8 py-5 text-xs transition-all flex items-center justify-between group/item ${value === opt.value
                                            ? 'bg-teal-500/10 text-teal-400 font-black'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white font-bold'
                                        }`}
                                >
                                    <span className="uppercase tracking-wider">{opt.label}</span>
                                    {value === opt.value ? (
                                        <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_15px_#14b8a6]"></div>
                                    ) : (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover/item:bg-white/20 transition-colors"></div>
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

export default function AdminSurveys() {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedModule, setSelectedModule] = useState('all');

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/surveys`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setSurveys(response.data.surveys);
                }
            } catch (error) {
                console.error('Error fetching surveys:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveys();
    }, [token]);

    const uniqueModules = Array.from(new Set(surveys.map(s => s.module_title).filter(Boolean)));

    const moduleOptions = [
        { label: 'Todos los módulos', value: 'all' },
        ...uniqueModules.map(m => ({ label: m, value: m }))
    ];

    const filteredSurveys = surveys.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesModule = selectedModule === 'all' || s.module_title === selectedModule;
        return matchesSearch && matchesModule;
    });

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh] gap-6 animate-fade-in text-center">
                <div className="relative">
                    <div className="w-24 h-24 border-[6px] border-teal-500/10 rounded-full shadow-2xl"></div>
                    <div className="absolute inset-0 w-24 h-24 border-[6px] border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ClipboardList className="w-8 h-8 text-teal-500 animate-pulse" />
                    </div>
                </div>
                <p className="text-[12px] font-black uppercase text-white tracking-[0.4em]">Cargando Encuestas</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-24 px-4 md:px-0">
            {/* Header */}
            <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/20 border border-white/5 shadow-2xl group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-teal-500/10 transition-all duration-1000 pointer-events-none"></div>

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
                                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-teal-500/20">Resultados</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{surveys.length} Encuestas</span>
                            </div>
                            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Respuestas de <span className="text-teal-500">Encuestas</span></h1>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <PremiumSelect
                            value={selectedModule}
                            onChange={setSelectedModule}
                            options={moduleOptions}
                            placeholder="Todos los módulos"
                        />

                        <div className="w-full md:w-80 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-teal-500 transition-colors" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full bg-slate-950 border border-white/10 rounded-2xl py-6 pl-14 pr-6 text-sm text-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all font-medium placeholder:text-gray-600"
                                placeholder="Buscar encuesta..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content List */}
            {filteredSurveys.length === 0 ? (
                <div className="text-center py-40 bg-slate-900/30 rounded-[3rem] border border-white/5 border-dashed flex flex-col items-center justify-center">
                    <Inbox className="w-20 h-20 text-gray-800 mb-6" />
                    <h3 className="text-xl font-black text-gray-500 uppercase">No se encontraron encuestas</h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSurveys.map((survey) => (
                        <div
                            key={survey.id}
                            className="group relative bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 hover:border-teal-500/30 rounded-[2.5rem] p-8 transition-all duration-500 shadow-lg flex flex-col justify-between overflow-hidden"
                        >
                            {/* Decorative background number */}
                            <div className="absolute -right-4 -bottom-4 text-[8rem] font-black text-white/[0.02] group-hover:text-teal-500/[0.05] transition-all duration-700 pointer-events-none italic">
                                {survey.id}
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                                        <Calendar className="w-3 h-3 text-teal-500" />
                                        {new Date(survey.created_at).toLocaleDateString()}
                                    </div>
                                    <span className="text-[10px] font-black text-gray-500 uppercase italic opacity-50">#{survey.id}</span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-black text-white uppercase leading-tight group-hover:text-teal-400 transition-colors">{survey.title}</h3>
                                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 font-medium leading-relaxed">{survey.description || 'Sin descripción adicional.'}</p>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1 italic">Participación</span>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-teal-500" />
                                            <span className="text-lg font-black text-white">{survey.response_count}</span>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Respuestas</span>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-teal-500/10 rounded-2xl border border-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-lg shadow-teal-500/0 group-hover:shadow-teal-500/20">
                                        <BarChart3 className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/admin/surveys/${survey.id}`)}
                                className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 active:scale-[0.98] group/btn"
                            >
                                Ver Analíticas Detalladas
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
