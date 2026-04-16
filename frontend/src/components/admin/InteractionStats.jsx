import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { LayoutGrid, PieChart as PieIcon, ListChecks, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

const API_URL = import.meta.env.VITE_API_URL;

export default function InteractionStats() {
    const { token } = useAuthStore();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/content/interactions/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setStats(response.data.stats);
                }
            } catch (error) {
                console.error('Error fetching interaction stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [token]);

    if (loading) {
        return (
            <div className="py-40 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Calculando estadísticas agregadas...</p>
            </div>
        );
    }

    if (stats.length === 0) {
        return (
            <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                <LayoutGrid className="w-16 h-16 text-gray-800 mx-auto mb-6" />
                <p className="text-sm font-black text-gray-500 uppercase">No hay datos suficientes para generar gráficos</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map((item) => (
                <div key={item.id} className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 group hover:border-emerald-500/20 transition-all">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase rounded-lg">
                                    {item.type === 'confirmation' ? 'Confirmación' : 'Múltiple Opción'}
                                </span>
                                <span className="text-[9px] font-black text-gray-500 uppercase italic">ID: #{item.id}</span>
                            </div>
                            <h4 className="text-sm font-black text-white uppercase leading-tight group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mt-2 italic">{item.total} Respuestas totales</p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-2xl border border-white/5">
                            <PieIcon className="w-5 h-5 text-emerald-500/50" />
                        </div>
                    </div>

                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={item.data} layout="vertical" margin={{ left: -20, right: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="label" 
                                    type="category" 
                                    axisLine={false} 
                                    tickLine={false}
                                    width={120}
                                    tick={(props) => {
                                        const { x, y, payload } = props;
                                        return (
                                            <g transform={`translate(${x},${y})`}>
                                                <text x={-10} y={0} dy={4} textAnchor="end" fill="#64748b" fontSize={9} fontWeight="900" className="uppercase truncate max-w-[100px]">
                                                    {payload.value.length > 15 ? payload.value.substring(0, 15) + '...' : payload.value}
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
                                    itemStyle={{ 
                                        fontSize: '11px', 
                                        fontWeight: '900', 
                                        textTransform: 'uppercase',
                                        color: '#ffffff'
                                    }}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Bar 
                                    dataKey="value" 
                                    name="Votos"
                                    radius={[0, 10, 10, 0]}
                                    barSize={24}
                                >
                                    {item.data.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.isCorrect ? '#10b981' : '#3b82f6'} 
                                            fillOpacity={1}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic mb-2">Desglose porcentual:</p>
                        <div className="grid grid-cols-1 gap-2">
                            {item.data.map((opt, idx) => (
                                <div key={idx} className="flex items-center justify-between group/opt bg-black/20 p-3 rounded-2xl hover:bg-black/40 transition-all border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${opt.isCorrect ? 'bg-emerald-500 shadow-emerald-500/40' : 'bg-blue-500 shadow-blue-500/40'}`}></div>
                                        <span className={`text-[10px] font-black uppercase tracking-tight ${opt.isCorrect ? 'text-emerald-400' : 'text-gray-300'}`}>
                                            {opt.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-gray-500 uppercase">{opt.value} Votos</span>
                                        <span className={`text-[11px] font-black px-3 py-1 rounded-lg border shadow-lg ${opt.isCorrect ? 'bg-emerald-500/20 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 border-blue-500/20 text-blue-400'}`}>
                                            {item.total > 0 ? Math.round((opt.value / item.total) * 100) : 0}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
