import React from 'react';
import { useModules } from '../hooks/useModules';
import { ModuleCardSkeleton, DashboardHeroSkeleton } from '../components/skeletons/DashboardSkeletons';
import Skeleton from '../components/Skeleton';
import ModulesHero from '../components/modules/ModulesHero';
import ModulesGrid from '../components/modules/ModulesGrid';

export default function Modules() {
    const {
        modules,
        loading,
        user,
        viewAsStudent,
        searchTerm,
        setSearchTerm
    } = useModules();

    if (loading && modules.length === 0) {
        return (
            <div className="space-y-8">
                <DashboardHeroSkeleton />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-12 w-full md:w-96" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <ModuleCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <ModulesHero />
            
            <ModulesGrid 
                modules={modules}
                user={user}
                viewAsStudent={viewAsStudent}
            />
        </div>
    );
}
