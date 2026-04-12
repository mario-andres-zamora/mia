import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useModuleStore } from '../store/moduleStore';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function useModuleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { fetchModule } = useModuleStore();
    const { user, viewAsStudent } = useAuthStore();
    const { setPendingModuleCompletion, setPendingBadge } = useNotificationStore();
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(location.state?.error || null);

    const handleResourceDownload = async (resource) => {
        try {
            const response = await axios.post(`${API_URL}/resources/${resource.id}/track-download`, {});

            if (response.data.success) {
                if (response.data.badgeAwarded) {
                    setPendingBadge(response.data.badgeAwarded);
                } else {
                    toast.success('Descarga registrada en tu progreso', {
                        duration: 2000,
                        icon: '✅',
                        style: {
                            fontSize: '12px',
                            padding: '8px 16px'
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error tracking download:', error);
        }
    };

    useEffect(() => {
        const loadModule = async () => {
            const data = await fetchModule(id);
            if (data.success) {
                const releaseDate = data.module.release_date ? new Date(data.module.release_date) : null;
                const isAdminView = user?.role === 'admin' && !viewAsStudent;
                const isDateLocked = releaseDate && releaseDate > new Date() && !isAdminView;

                if (isDateLocked) {
                    const formattedDate = releaseDate.toLocaleDateString('es-CR', { day: 'numeric', month: 'long', year: 'numeric' });
                    toast.error(`Este módulo estará disponible el ${formattedDate}`, {
                        id: `locked-${id}`,
                        icon: '🔒'
                    });
                    navigate('/modules');
                    return;
                }
                setModule(data.module);
            } else {
                setError(data.error || 'Módulo no encontrado');
            }
            setLoading(false);
        };
        loadModule();
    }, [id, fetchModule, navigate, user, viewAsStudent]);

    const isPrerequisiteLocked = !!module?.is_locked && user?.role !== 'admin' && !viewAsStudent;

    const startNextLesson = () => {
        if (isPrerequisiteLocked) {
            setError('Módulo bloqueado');
            return;
        }
        const nextLesson = module.lessons.find(l => l.status !== 'completed') || module.lessons[0];
        if (nextLesson) navigate(`/lessons/${nextLesson.id}`);
    };

    const handleCelebration = () => {
        setPendingModuleCompletion({
            moduleId: module.id,
            bonusPoints: module.points_to_earn || 0,
            generatesCertificate: !!module.generates_certificate
        });
    };

    return {
        id,
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
    };
}
