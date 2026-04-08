import React from 'react';
import { Search, Building2, Filter } from 'lucide-react';

export default function DirectoryFilters({ 
    searchTerm, 
    onSearchChange, 
    filterDepartment, 
    onDepartmentChange, 
    filterStatus, 
    onStatusChange, 
    departments 
}) {
    return (
        <div className="flex flex-col lg:flex-row gap-3 text-left">
            <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                <input
                    type="text"
                    placeholder="Buscar por nombre, email, departamento o puesto..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-slate-900/40 border border-white/5 rounded-2xl text-white text-sm font-medium focus:outline-none focus:border-primary-500/50 transition-all shadow-2xl"
                />
            </div>

            <div className="flex gap-3">
                <div className="relative min-w-[200px]">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                        value={filterDepartment}
                        onChange={(e) => onDepartmentChange(e.target.value)}
                        className="w-full pl-11 pr-10 py-4 bg-slate-900/40 border border-white/5 rounded-2xl text-white text-xs font-bold focus:outline-none focus:border-primary-500 appearance-none cursor-pointer uppercase tracking-tight"
                    >
                        <option value="">Todas las Unidades</option>
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                    </select>
                </div>

                <div className="relative min-w-[180px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                        value={filterStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full pl-11 pr-10 py-4 bg-slate-900/40 border border-white/5 rounded-2xl text-white text-xs font-bold focus:outline-none focus:border-primary-500 appearance-none cursor-pointer uppercase tracking-tight"
                    >
                        <option value="">Todos los Estados</option>
                        <option value="registered">Registrados</option>
                        <option value="pending">Pendientes</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
