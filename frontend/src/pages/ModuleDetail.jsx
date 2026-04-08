import React from 'react';
import { useModuleDetail } from '../hooks/useModuleDetail';
import ModuleDetailSkeleton from '../components/skeletons/ModuleDetailSkeleton';
import ModuleErrorState from '../components/module-detail/ModuleErrorState';
import ModuleHero from '../components/module-detail/ModuleHero';
import LessonList from '../components/module-detail/LessonList';
import ModuleResources from '../components/module-detail/ModuleResources';

export default function ModuleDetail() {
    const {
        module,
        loading,
        error,
        setError,
        user,
        viewAsStudent,
        isPrerequisiteLocked,
        handleResourceDownload,
        startNextLesson,
        handleCelebration,
        navigate
    } = useModuleDetail();

    if (loading) {
        return <ModuleDetailSkeleton />;
    }

    if (error || isPrerequisiteLocked) {
        // If it's a prerequisite lock but error hasn't been set yet
        const displayError = error || (isPrerequisiteLocked ? 'Módulo bloqueado' : null);
        
        if (displayError) {
            return (
                <ModuleErrorState 
                    error={displayError}
                    module={module}
                    onBack={() => navigate('/modules')}
                    onTogglePreview={() => setError(null)}
                />
            );
        }
    }

    if (!module) {
        return (
            <ModuleErrorState 
                error="Módulo no encontrado"
                onBack={() => navigate('/modules')}
            />
        );
    }

    const isAdmin = user?.role === 'admin' && !viewAsStudent;

    return (
        <div className="space-y-6 animate-fade-in">
            <ModuleHero 
                module={module}
                onBack={() => navigate('/modules')}
                onStart={startNextLesson}
                onCelebrate={handleCelebration}
            />

            <div className="space-y-8">
                <LessonList 
                    lessons={module.lessons}
                    isAdmin={isAdmin}
                    onLessonClick={(lesson) => navigate(`/lessons/${lesson.id}`)}
                />

                <ModuleResources 
                    resources={module.resources}
                    onDownload={handleResourceDownload}
                />
            </div>
        </div>
    );
}
