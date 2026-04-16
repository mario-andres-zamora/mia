import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL;

export function useInteractions() {
    const { token } = useAuthStore();
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        searchTerm: '',
        moduleId: '',
        lessonId: ''
    });

    const fetchInteractions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/content/interactions/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setInteractions(response.data.interactions);
            }
        } catch (error) {
            console.error('Error fetching interactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInteractions();
    }, [token]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredInteractions = useMemo(() => {
        return interactions.filter(item => {
            const matchesSearch = 
                item.first_name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                item.last_name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                item.email?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                item.content_title?.toLowerCase().includes(filters.searchTerm.toLowerCase());
            
            const matchesModule = !filters.moduleId || item.module_id === parseInt(filters.moduleId);
            const matchesLesson = !filters.lessonId || item.lesson_id === parseInt(filters.lessonId);

            return matchesSearch && matchesModule && matchesLesson;
        });
    }, [interactions, filters]);

    const uniqueModules = useMemo(() => {
        const modules = {};
        interactions.forEach(item => {
            modules[item.module_id] = item.module_title;
        });
        return Object.entries(modules).map(([id, title]) => ({ id, title }));
    }, [interactions]);

    const uniqueLessons = useMemo(() => {
        const lessons = {};
        interactions.forEach(item => {
            if (!filters.moduleId || item.module_id === parseInt(filters.moduleId)) {
                lessons[item.lesson_id] = item.lesson_title;
            }
        });
        return Object.entries(lessons).map(([id, title]) => ({ id, title }));
    }, [interactions, filters.moduleId]);

    return {
        interactions: filteredInteractions,
        loading,
        filters,
        updateFilter,
        uniqueModules,
        uniqueLessons,
        refresh: fetchInteractions
    };
}
