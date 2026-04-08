import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export function useAssignments(isAuthenticated) {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        searchTerm: '',
        status: 'all',
        moduleId: 'all',
        lessonId: 'all'
    });

    // Grading states
    const [gradingSubmission, setGradingSubmission] = useState(null);
    const [gradeData, setGradeData] = useState({ grade: 0, feedback: '' });

    useEffect(() => {
        if (isAuthenticated) fetchSubmissions();
    }, [isAuthenticated]);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/content/assignments/all-submissions`);
            if (response.data.success) {
                setSubmissions(response.data.submissions);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
            toast.error('Error al cargar entregas');
        } finally {
            setLoading(false);
        }
    };

    const updateFilter = (key, value) => {
        setFilters(prev => {
            const next = { ...prev, [key]: value };
            // Si cambia el módulo, resetear la lección
            if (key === 'moduleId') next.lessonId = 'all';
            return next;
        });
    };

    const handleOpenGradeModal = (sub) => {
        setGradingSubmission(sub);
        setGradeData({
            grade: sub.grade || 100,
            feedback: sub.feedback || ''
        });
    };

    const handleCloseGradeModal = () => setGradingSubmission(null);

    const handleGradeSubmit = async (status) => {
        try {
            const gradePoints = status === 'approved' ? gradeData.grade : 0;
            const res = await axios.put(`${API_URL}/content/assignment/submission/${gradingSubmission.id}`,
                { status, grade: gradePoints, feedback: gradeData.feedback }
            );

            if (res.data.success) {
                toast.success(`Entrega ${status === 'approved' ? 'aprobada' : 'rechazada'}`);
                setSubmissions(prev => prev.map(s =>
                    s.id === gradingSubmission.id ? { ...s, status, grade: gradePoints, feedback: gradeData.feedback } : s
                ));
                handleCloseGradeModal();
            }
        } catch (error) {
            toast.error('Error al evaluar la entrega');
        }
    };

    // --- Memoized values for performance ---
    
    const filteredSubmissions = useMemo(() => {
        return submissions.filter(sub => {
            const matchesSearch =
                `${sub.first_name} ${sub.last_name}`.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                sub.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                sub.module_title.toLowerCase().includes(filters.searchTerm.toLowerCase());

            const matchesStatus = filters.status === 'all' || sub.status === filters.status;
            const matchesModule = filters.moduleId === 'all' || sub.module_id.toString() === filters.moduleId;
            const matchesLesson = filters.lessonId === 'all' || sub.lesson_id.toString() === filters.lessonId;
            
            return matchesSearch && matchesStatus && matchesModule && matchesLesson;
        });
    }, [submissions, filters]);

    const uniqueModules = useMemo(() => {
        const uniqueIds = Array.from(new Set(submissions.map(s => s.module_id)));
        return uniqueIds.map(id => submissions.find(s => s.module_id === id));
    }, [submissions]);

    const uniqueLessons = useMemo(() => {
        const filteredByModule = submissions.filter(s => 
            filters.moduleId === 'all' || s.module_id.toString() === filters.moduleId
        );
        const uniqueIds = Array.from(new Set(filteredByModule.map(s => s.lesson_id)));
        return uniqueIds.map(id => filteredByModule.find(s => s.lesson_id === id));
    }, [submissions, filters.moduleId]);

    const stats = useMemo(() => ({
        pending: submissions.filter(s => s.status === 'pending').length,
        total: submissions.length
    }), [submissions]);

    return {
        submissions,
        filteredSubmissions,
        loading,
        filters,
        updateFilter,
        uniqueModules,
        uniqueLessons,
        stats,
        gradingActions: {
            gradingSubmission,
            gradeData,
            setGradeData,
            open: handleOpenGradeModal,
            close: handleCloseGradeModal,
            submit: handleGradeSubmit
        }
    };
}
