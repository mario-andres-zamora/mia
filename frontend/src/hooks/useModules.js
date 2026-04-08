import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModuleStore } from '../store/moduleStore';
import { useAuthStore } from '../store/authStore';

export function useModules() {
    const { modules, loading, fetchModules, error } = useModuleStore();
    const { user, viewAsStudent } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchModules();
    }, [fetchModules]);

    useEffect(() => {
        if (error) {
            navigate('/500');
        }
    }, [error, navigate]);

    const filteredModules = modules.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
        modules: filteredModules,
        loading,
        user,
        viewAsStudent,
        searchTerm,
        setSearchTerm,
        navigate
    };
}
