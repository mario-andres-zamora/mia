import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Configurar la base URL para que las peticiones relativas funcionen
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// Re-exportar la instancia global de axios
// Las configuraciones e interceptores definidos en authStore.js se aplicarán aquí también
export default axios;
