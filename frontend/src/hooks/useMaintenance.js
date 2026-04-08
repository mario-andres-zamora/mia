import { useNavigate } from 'react-router-dom';

export function useMaintenance() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return {
        goHome
    };
}
