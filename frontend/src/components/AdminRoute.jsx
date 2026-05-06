import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

/**
 * Componente para proteger rutas de administrador.
 * Debe usarse dentro de un ProtectedRoute para asegurar que el usuario ya está autenticado.
 * 
 * @param {Array} roles - Lista de roles permitidos para acceder a la ruta. Por defecto ['admin'].
 */
export default function AdminRoute({ roles = ['admin'] }) {
    const { user, viewAsStudent } = useAuthStore();

    // Si el usuario no tiene uno de los roles permitidos o si el admin activó el "modo estudiante"
    if (!user || !roles.includes(user.role) || viewAsStudent) {
        return <Navigate to="/404" replace />;
    }

    return <Outlet />;
}

