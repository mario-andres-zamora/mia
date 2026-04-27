import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, 
    BarChart3, 
    Download, 
    Users, 
    MessageSquare, 
    Star, 
    ListChecks, 
    Type,
    Loader2,
    Calendar,
    ArrowLeft,
    ArrowRight,
    Search,
    PieChart as PieChartIcon
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    Cell, PieChart, Pie, Legend 
} from 'recharts';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL;

const ChartSection = ({ data, isRating, totalResponses }) => {
    const [chartType, setChartType] = useState('bar');

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-end gap-2">
                <button 
                    onClick={() => setChartType('bar')}
                    className={`p-2 rounded-xl transition-all duration-300 ${chartType === 'bar' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    title="Vista de Barras"
                >
                    <BarChart3 className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setChartType('pie')}
                    className={`p-2 rounded-xl transition-all duration-300 ${chartType === 'pie' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    title="Vista de Pastel"
                >
                    <PieChartIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="h-64 w-full relative animate-fade-in">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                        <BarChart data={data} layout="vertical" margin={{ left: -20, right: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis 
                                dataKey="label" 
                                type="category" 
                                axisLine={false} 
                                tickLine={false}
                                width={100}
                                tick={(props) => {
                                    const { x, y, payload } = props;
                                    return (
                                        <g transform={`translate(${x},${y})`}>
                                            <text x={-10} y={0} dy={4} textAnchor="end" fill="#64748b" fontSize={9} fontStyle="italic" fontWeight="900" className="uppercase">
                                                {payload.value}
                                            </text>
                                        </g>
                                    );
                                }}
                            />
                            <Tooltip 
                                cursor={{ fill: '#ffffff05' }}
                                contentStyle={{ 
                                    backgroundColor: '#0f172a', 
                                    border: '1px solid #ffffff14', 
                                    borderRadius: '16px', 
                                    padding: '12px 16px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                                itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', color: '#ffffff' }}
                                labelStyle={{ display: 'none' }}
                            />
                            <Bar 
                                dataKey="value" 
                                name="Respuestas"
                                radius={[0, 10, 10, 0]}
                                barSize={24}
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={isRating ? `hsl(45, 90%, ${70 - (index * 10)}%)` : `hsl(160, 60%, ${60 - (index * 5)}%)`} 
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="label"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={isRating ? `hsl(45, 90%, ${70 - (index * 10)}%)` : `hsl(160, 60%, ${60 - (index * 5)}%)`} 
                                    />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#0f172a', 
                                    border: '1px solid #ffffff14', 
                                    borderRadius: '16px', 
                                    padding: '12px 16px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                                itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', color: '#ffffff' }}
                            />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="grid grid-cols-1 gap-2">
                    {data.map((opt, idx) => (
                        <div key={idx} className="flex items-center justify-between group/opt bg-black/20 p-3 rounded-2xl hover:bg-black/40 transition-all border border-transparent hover:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${isRating ? 'bg-yellow-500 shadow-yellow-500/40' : 'bg-teal-500 shadow-teal-500/40'}`}></div>
                                <span className="text-[10px] font-black uppercase text-gray-300 tracking-tight">
                                    {opt.label}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-gray-500 uppercase">{opt.value}</span>
                                <span className={`text-[10px] font-black px-3 py-1 rounded-lg border shadow-lg ${isRating ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-teal-500/10 border-teal-500/20 text-teal-400'}`}>
                                    {totalResponses > 0 ? Math.round((opt.value / totalResponses) * 100) : 0}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TextAnswersList = ({ questionId, initialData, token }) => {
    const [answers, setAnswers] = useState(initialData.answers);
    const [pagination, setPagination] = useState({
        page: initialData.page || 1,
        limit: initialData.limit || 5,
        total: initialData.total || 0,
        totalPages: initialData.totalPages || 0
    });
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchAnswers = async (page = 1, searchQuery = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/surveys/questions/${questionId}/text-answers`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, limit: 5, search: searchQuery }
            });
            if (response.data.success) {
                setAnswers(response.data.answers);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error('Error fetching text answers:', error);
        } finally {
            setLoading(false);
        }
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        fetchAnswers(1, search);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <form onSubmit={onSearchSubmit} className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-teal-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Buscar en respuestas..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-[11px] text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 transition-all"
                    />
                </form>
                <div className="flex items-center justify-between sm:justify-end gap-3 px-2 sm:px-0">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest whitespace-nowrap">{pagination.total} Respuestas</span>
                </div>
            </div>

            <div className="space-y-3 min-h-[100px]">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="w-6 h-6 text-teal-500 animate-spin" />
                    </div>
                ) : answers.length > 0 ? (
                    answers.map((ans, i) => (
                        <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 text-xs text-gray-400 italic font-medium leading-relaxed animate-fade-in group/item hover:border-white/10 transition-all">
                            "{ans.text}"
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 bg-black/20 rounded-[2rem] border border-dashed border-white/5">
                        <MessageSquare className="w-8 h-8 text-gray-700 mb-3" />
                        <p className="text-[10px] text-gray-600 italic uppercase tracking-widest">No se encontraron respuestas</p>
                    </div>
                )}
            </div>

            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <button 
                        type="button"
                        onClick={() => fetchAnswers(pagination.page - 1, search)}
                        disabled={pagination.page === 1 || loading}
                        className="p-2 bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg border border-white/10 transition-all active:scale-90"
                    >
                        <ArrowLeft className="w-4 h-4 text-white" />
                    </button>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        Página {pagination.page} / {pagination.totalPages}
                    </span>
                    <button 
                        type="button"
                        onClick={() => fetchAnswers(pagination.page + 1, search)}
                        disabled={pagination.page === pagination.totalPages || loading}
                        className="p-2 bg-white/5 hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg border border-white/10 transition-all active:scale-90"
                    >
                        <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default function AdminSurveyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuthStore();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/surveys/${id}/analytics`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setAnalytics(response.data);
                }
            } catch (error) {
                console.error('Error fetching survey analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [id, token]);

    const handleExport = async () => {
        try {
            const response = await axios.get(`${API_URL}/surveys/${id}/export`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Resultados_Encuesta_${analytics?.survey?.title.replace(/[^a-z0-9]/gi, '_')}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting survey:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh] gap-6 animate-fade-in text-center">
                <Loader2 className="w-16 h-16 text-teal-500 animate-spin" />
                <p className="text-[12px] font-black uppercase text-white tracking-[0.4em]">Procesando Estadísticas de la Encuesta</p>
            </div>
        );
    }

    if (!analytics) return null;

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-24 px-4 md:px-0">
            {/* Header */}
            <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/20 border border-white/5 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-teal-500/10 transition-all duration-1000"></div>
                
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 text-center md:text-left">
                        <button 
                            onClick={() => navigate('/admin/surveys')}
                            className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center transition-all group/back active:scale-90"
                        >
                            <ChevronLeft className="w-6 h-6 text-white group-hover/back:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3 mb-1 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-teal-500/20">Detalle de Analíticas</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{analytics.survey.totalResponses} Participantes</span>
                            </div>
                            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">{analytics.survey.title}</h1>
                        </div>
                    </div>

                    <button 
                        onClick={handleExport}
                        className="btn-secondary px-8 flex items-center gap-3 group/export"
                    >
                        <Download className="w-5 h-5 text-teal-500 group-hover/export:translate-y-0.5 transition-transform" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Descargar Resultados (CSV)</span>
                    </button>
                </div>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {analytics.analytics.map((q, idx) => {
                    const isText = q.type === 'text';
                    const isRating = q.type === 'rating';
                    
                    return (
                        <div key={q.questionId} className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 group hover:border-teal-500/20 transition-all shadow-xl">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase border ${
                                            isText ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                                            isRating ? 'bg-yellow-500/10 text-yellow-400 border-yellow-400/20' : 
                                            'bg-teal-500/10 text-teal-400 border-teal-500/20'
                                        }`}>
                                            {q.type}
                                        </span>
                                        <span className="text-[9px] font-black text-gray-500 uppercase italic">Pregunta #{idx + 1}</span>
                                    </div>
                                    <h4 className="text-sm font-black text-white uppercase leading-tight group-hover:text-teal-400 transition-colors">{q.text}</h4>
                                </div>
                                <div className="p-3 bg-slate-950 rounded-2xl border border-white/5">
                                    {isText ? <Type className="w-5 h-5 text-blue-500/50" /> : 
                                     isRating ? <Star className="w-5 h-5 text-yellow-500/50" /> : 
                                     <ListChecks className="w-5 h-5 text-teal-500/50" />}
                                </div>
                            </div>

                            {isText ? (
                                <TextAnswersList 
                                    questionId={q.questionId} 
                                    initialData={q.data} 
                                    token={token} 
                                />
                            ) : (
                                <ChartSection 
                                    data={q.data} 
                                    isRating={isRating} 
                                    totalResponses={analytics.survey.totalResponses} 
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
