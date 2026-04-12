import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export function useProfile() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { user: authUser } = useAuthStore();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 10;

    const fetchProfile = async () => {
        try {
            if (userId && authUser?.role !== 'admin') {
                toast.error('No tienes permisos para ver el historial de otros usuarios');
                navigate('/profile');
                return;
            }

            setLoading(true);
            const endpoint = userId ? `${API_URL}/users/${userId}/full-profile` : `${API_URL}/users/profile`;
            const response = await axios.get(endpoint);
            if (response.data.success) {
                setProfileData(response.data);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Error al cargar el perfil';
            toast.error(errorMsg);
            if (error.response?.status === 403 || error.response?.status === 404) {
                navigate('/dashboard');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return {
        profileData,
        loading,
        currentPage,
        setCurrentPage: paginate,
        activitiesPerPage,
        userId,
        navigate,
        fetchProfile
    };
}
