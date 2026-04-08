import React from 'react';
import { Search } from 'lucide-react';

export default function AssignmentFilters({ children }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/20 p-4 rounded-3xl border border-white/5 backdrop-blur-sm shadow-inner group text-left">
            {children}
        </div>
    );
}

AssignmentFilters.Search = ({ value, onChange }) => (
    <div className="relative group-focus-within:ring-2 ring-primary-500/20 rounded-xl transition-all">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-primary-400 transition-colors" />
        <input
            type="text"
            placeholder="Buscar usuario o email..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-primary-500 outline-none placeholder:text-gray-600 font-medium"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

AssignmentFilters.Select = ({ icon: Icon, value, onChange, options, placeholder, accentColor = "primary" }) => {
    const accentClasses = {
        primary: "focus:border-primary-400 font-bold",
        secondary: "focus:border-secondary-500 font-bold",
        pink: "focus:border-pink-500 font-bold"
    };

    return (
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icon className="w-4 h-4 text-gray-500" />
            </div>
            <select
                className={`w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white appearance-none outline-none cursor-pointer font-medium hover:border-white/20 transition-all ${accentClasses[accentColor]}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="all" className="bg-slate-900 uppercase font-black text-[10px] tracking-widest">{placeholder}</option>
                {options.map(opt => (
                    <option key={`opt-${opt.id}`} value={opt.id} className="bg-slate-900 uppercase font-black text-[10px] tracking-widest">{opt.label}</option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">▼</div>
        </div>
    );
};
