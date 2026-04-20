import { useState, useMemo } from 'react';
import { Building2, Star, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

export default function StrategicView({ filteredDepts }) {
    const [sortConfig, setSortConfig] = useState({ key: 'average_points', direction: 'desc' });

    const requestSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const sortedDepts = useMemo(() => {
        let items = [...filteredDepts];
        if (sortConfig.key) {
            items.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Handle numeric strings or nulls
                if (typeof aValue === 'string' && !isNaN(aValue)) aValue = parseFloat(aValue);
                if (typeof bValue === 'string' && !isNaN(bValue)) bValue = parseFloat(bValue);

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return items;
    }, [filteredDepts, sortConfig]);

    const SortIcon = ({ column }) => {
        if (sortConfig.key !== column) return <ArrowUpDown className="w-3 h-3 opacity-30 group-hover:opacity-50 transition-opacity" />;
        return sortConfig.direction === 'asc' 
            ? <ChevronUp className="w-3 h-3 text-secondary-400" /> 
            : <ChevronDown className="w-3 h-3 text-secondary-400" />;
    };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <div className="col-span-1 text-center">Pos</div>
                    
                    <button 
                        onClick={() => requestSort('department')}
                        className="col-span-5 md:col-span-4 flex items-center gap-2 text-left pl-4 hover:text-white transition-colors group"
                    >
                        Área / Unidad
                        <SortIcon column="department" />
                    </button>

                    <button 
                        onClick={() => requestSort('top_performer')}
                        className="col-span-6 md:col-span-3 flex items-center gap-2 italic text-gray-600 hover:text-white transition-colors group"
                    >
                        Mejor Funcionario
                        <SortIcon column="top_performer" />
                    </button>

                    <button 
                        onClick={() => requestSort('average_points')}
                        className="hidden md:flex col-span-2 items-center justify-end gap-2 uppercase hover:text-white transition-colors group"
                    >
                        Promedio
                        <SortIcon column="average_points" />
                    </button>

                    <button 
                        onClick={() => requestSort('total_points')}
                        className="hidden md:flex col-span-2 items-center justify-end gap-2 uppercase hover:text-white transition-colors group"
                    >
                        Total
                        <SortIcon column="total_points" />
                    </button>
                </div>

                {sortedDepts.map((dept, index) => (
                    <div key={index} className="grid grid-cols-12 items-center px-8 py-6 rounded-3xl border bg-slate-800/20 border-white/5 hover:border-primary-500/30 transition-all group cursor-default">
                        <div className="col-span-1 text-center font-black text-lg text-gray-500">
                            {sortConfig.key === 'average_points' && sortConfig.direction === 'desc' ? index + 1 : '-'}
                        </div>
                        <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-secondary-500/10 flex items-center justify-center text-secondary-500 shadow-lg shadow-secondary-500/10 shrink-0">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 pr-4">
                                <p className="text-sm font-black text-white group-hover:text-secondary-500 transition-colors uppercase tracking-tight leading-tight">{dept.department}</p>
                                <p className="text-[10px] text-gray-300 font-bold uppercase">{dept.staff_count} Funcionarios</p>
                            </div>
                        </div>
                        <div className="col-span-6 md:col-span-3 flex items-center gap-3 text-left">
                            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0">
                                <Star className="w-4 h-4 fill-primary-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-100 uppercase tracking-tight leading-tight mb-0.5">{dept.top_performer}</p>
                                <div className="flex flex-wrap items-center gap-x-2">
                                    <p className="text-[9px] text-gray-400 font-bold uppercase italic">Líder: {dept.top_points} PTS</p>
                                    <p className="md:hidden text-[9px] text-secondary-400 font-black uppercase italic">| AVG: {parseFloat(dept.average_points || 0).toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block col-span-2 text-right">
                            <p className="text-xl font-black text-[#EF8843] italic">{parseFloat(dept.average_points || 0).toFixed(1)} PTS</p>
                            <p className="text-[9px] text-gray-500 font-bold uppercase">Promedio</p>
                        </div>
                        <div className="hidden md:block col-span-2 text-right opacity-60">
                            <p className="text-sm font-black text-white italic">{dept.total_points.toLocaleString()} PTS</p>
                            <p className="text-[8px] text-gray-600 font-bold uppercase">Total</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
