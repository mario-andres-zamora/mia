import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export function useLogin() {
    const navigate = useNavigate();
    const { loginWithGoogle, isLoading, error, clearError } = useAuthStore();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error, clearError]);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const result = await loginWithGoogle(tokenResponse.access_token);
            if (result.success) {
                if (result.user.is_active === false) {
                    toast.error('Tu cuenta está deshabilitada');
                    navigate('/disabled');
                } else {
                    toast.success(`¡Bienvenido ${result.user.firstName}!`);
                    navigate('/dashboard');
                }
            }
        },
        onError: () => {
            toast.error('Error al iniciar sesión con Google');
        },
    });

    return {
        googleLogin,
        isLoading
    };
}
