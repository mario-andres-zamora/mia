import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAdminPanel() {
    const [stats, setStats] = useState({
        users: 0,
        activeUsers: 0,
        modules: 0,
        campaigns: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${API_URL}/dashboard/admin-stats`);
                if (response.data.success) {
                    setStats(response.data.stats);
                }
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return {
        stats,
        loading
    };
}
