import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminCard({ title, description, icon: Icon, path, stats, iconBg }) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(path)}
            className="group relative flex flex-col p-8 rounded-[2rem] bg-[#1a1f3d]/40 border border-white/5 hover:border-white/10 transition-all duration-300 text-left overflow-hidden shadow-2xl hover:bg-[#1a1f3d]/60"
        >
            {/* Background Glow (Top Right) */}
            <div className={`absolute -top-4 -right-4 w-32 h-32 rounded-full blur-[40px] opacity-10 transition-opacity group-hover:opacity-20 ${iconBg.replace('bg-', 'bg-')}`} />

            <div className="space-y-6 relative z-10 w-full">
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${iconBg}`}>
                    <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="space-y-2 min-h-[100px]">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                        {description}
                    </p>
                </div>

                {/* Bottom Stats */}
                <div className="pt-6 border-t border-white/5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                        {stats}
                    </span>
                </div>
            </div>
        </button>
    );
}
