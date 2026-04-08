import React from 'react';
import { Award, Edit2, Trash2, Shield, Star, Trophy, Crown, Target, Zap, Lock, ShieldCheck, Key, Bell } from 'lucide-react';

const icons = {
    Award, Shield, Star, Trophy, Crown, Target, Zap, Lock, ShieldCheck, Key, Bell
};

export default function BadgeGrid({ badges, onEdit, onDelete }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {badges.map((badge) => {
                const Icon = icons[badge.icon_name] || Award;
                return (
                    <div key={badge.id} className="card group p-8 bg-slate-900/40 border-white/5 hover:border-primary-500/30 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-bl-full blur-3xl group-hover:bg-primary-500/10 transition-all"></div>

                        <div className="flex items-start justify-between mb-8 relative">
                            <div className="w-20 h-20 rounded-[2.5rem] bg-slate-950 border border-white/10 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500 shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Icon className="w-10 h-10 text-primary-400 relative z-10" />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(badge)}
                                    className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                    title="Editar"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(badge)}
                                    className="p-3 bg-red-500/5 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    title="Eliminar"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 relative">
                            <div className="text-left">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">{badge.name}</h3>
                                <p className="text-xs text-gray-400 font-medium leading-relaxed mt-2 line-clamp-3 h-12 text-left">{badge.description}</p>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 justify-start">
                                <span className="px-3 py-1 bg-primary-500/10 text-primary-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-primary-500/10">
                                    {badge.criteria_type}
                                </span>
                                {badge.criteria_value && (
                                    <span className="px-3 py-1 bg-white/5 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-white/5">
                                        Val: {badge.criteria_value}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
