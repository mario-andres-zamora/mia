import React from 'react';
import { Trophy, Award, Star, Percent } from 'lucide-react';

export default function ProfileStats({ stats, progress, department }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400">
                    <Percent className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-3xl font-black text-white leading-none">{progress.percentage}%</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Avance Global</p>
                </div>
            </div>
            <div className="card p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Trophy className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-3xl font-black text-white leading-none">#{stats.rank || '--'}</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Ranking Institucional</p>
                    <p className="text-[8px] font-bold text-gray-600 uppercase mt-1">De {stats.totalUsers || '--'} funcionarios</p>
                </div>
            </div>
            <div className="card p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary-500/10 border border-secondary-500/20 flex items-center justify-center text-secondary-500">
                    <Star className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-3xl font-black text-white leading-none">#{stats.departmentRank || '--'}</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Ranking en su Área</p>
                    <p className="text-[8px] font-bold text-gray-600 uppercase mt-1">{department || 'Área no asignada'}</p>
                </div>
            </div>
            <div className="card p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-3xl font-black text-white leading-none">{stats.badges_count || 0}</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Insignias</p>
                </div>
            </div>
        </div>
    );
}
