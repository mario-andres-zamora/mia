import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import ProfileSkeleton from '../components/skeletons/ProfileSkeleton';
import ProfileHero from '../components/profile/ProfileHero';
import ProfileStats from '../components/profile/ProfileStats';
import ActivityHistory from '../components/profile/ActivityHistory';
import CertificatesAndBadges from '../components/profile/CertificatesAndBadges';

export default function Profile() {
    const {
        profileData,
        loading,
        currentPage,
        setCurrentPage,
        activitiesPerPage,
        userId,
        navigate
    } = useProfile();

    if (loading) {
        return <ProfileSkeleton />;
    }

    if (!profileData) return null;

    const { user, stats, progress, activities, certificates } = profileData;

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            {/* Admin Back Button */}
            {userId && (
                <button
                    onClick={() => navigate('/admin/users')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver a Gestión de Usuarios
                </button>
            )}

            <ProfileHero user={user} stats={stats} />

            <ProfileStats 
                stats={stats} 
                progress={progress} 
                department={user.department} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <ActivityHistory 
                        activities={activities}
                        currentPage={currentPage}
                        activitiesPerPage={activitiesPerPage}
                        onPageChange={setCurrentPage}
                        onActivityClick={(activity) => {
                            const refId = activity.reference_id;
                            if (!refId) return;
                            if (activity.type === 'lesson_completed') navigate(`/lessons/${refId}`);
                            if (activity.type === 'quiz_passed') navigate(`/quizzes/${refId}`);
                            if (activity.type === 'module_completed') navigate(`/modules/${refId}`);
                        }}
                    />
                </div>

                <div className="lg:col-span-1">
                    <CertificatesAndBadges 
                        certificates={certificates}
                        badges={stats.badges}
                        stats={stats}
                        onCertClick={(cert) => navigate(`/certificates/module/${cert.module_id}`)}
                    />
                </div>
            </div>
        </div>
    );
}
