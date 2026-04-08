import React from 'react';
import { Mail, Briefcase, Building2, Shield } from 'lucide-react';

export default function ProfileHero({ user, stats }) {
    return (
        <div className="relative rounded-[3rem] overflow-hidden bg-slate-800/40 border border-white/5 shadow-2xl">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary-500/10 to-transparent"></div>
            <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                {/* Portrait */}
                <div className="relative">
                    <div className="w-40 h-40 rounded-[2.5rem] p-1 bg-gradient-to-tr from-primary-500 via-secondary-500 to-accent-500 shadow-2xl overflow-hidden animate-pulse-slow">
                        <div className="w-full h-full bg-slate-900 rounded-[2.3rem] flex items-center justify-center overflow-hidden">
                            <img
                                src={user.profile_picture || `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=384A99&color=fff&size=200`}
                                alt={user.first_name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-secondary-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border-4 border-slate-900">
                        <Shield className="w-6 h-6" />
                    </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                            {user.first_name} {user.last_name}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-sm font-medium">
                            <span className="flex items-center gap-1.5" title="Correo Institucional"><Mail className="w-4 h-4 text-primary-400" /> {user.email}</span>
                            <span className="mx-1 text-gray-700 hidden md:block">•</span>
                            <span className="flex items-center gap-1.5" title="Unidad Administrativa">
                                <Building2 className="w-4 h-4 text-primary-400" />
                                <span className="text-gray-500 mr-1">Área:</span> {user.department || 'Sin asignar'}
                            </span>
                            <span className="mx-1 text-gray-700 hidden md:block">•</span>
                            <span className="flex items-center gap-1.5" title="Cargo Institucional">
                                <Briefcase className="w-4 h-4 text-primary-400" />
                                <span className="text-gray-500 mr-1">Puesto:</span> {user.position || 'Sin asignar'}
                            </span>
                        </div>
                    </div>

                    {/* Level & Points Bar */}
                    <div className="space-y-4 pt-4 w-full">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-1 text-left">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Rango Actual</span>
                                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">
                                    {stats.level}
                                </h2>
                            </div>
                            <div className="flex flex-col items-end gap-1 pb-1">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Siguiente Rango</span>
                                <span className="text-2xl font-black text-secondary-500 uppercase italic leading-none">
                                    {stats.next_level_name}
                                </span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="h-2.5 bg-slate-900/80 rounded-full border border-white/5 overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-secondary-600 via-secondary-400 to-secondary-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(229,123,60,0.4)]"
                                    style={{ width: `${stats.level_progress_percentage || 0}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-1">
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <span className="text-white text-sm">{stats.points}</span> PUNTOS TOTALES
                                </span>
                            </div>

                            {stats.next_level_min_points ? (
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                        PRÓXIMO NIVEL: <span className="text-secondary-400 text-sm">{stats.next_level_min_points}</span> PUNTOS
                                    </span>
                                </div>
                            ) : (
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-secondary-500 uppercase tracking-widest animate-pulse">
                                        LEYENDA MÁXIMA ALCANZADA
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
