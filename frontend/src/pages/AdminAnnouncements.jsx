import React, { useState, useEffect } from 'react';
import { 
    Bell, 
    Plus, 
    Edit2, 
    Trash2, 
    ToggleLeft, 
    ToggleRight, 
    Search,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Calendar,
    Target
} from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Form State
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        is_active: true,
        target_module_id: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [annResp, modResp] = await Promise.all([
                axios.get(`${API_URL}/announcements/admin`),
                axios.get(`${API_URL}/modules/admin/all`)
            ]);
            setAnnouncements(annResp.data.announcements);
            setModules(modResp.data.modules);
        } catch (error) {
            toast.error('Error al cargar datos');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (ann) => {
        setEditingId(ann.id);
        setFormData({
            title: ann.title,
            content: ann.content,
            is_active: !!ann.is_active,
            target_module_id: ann.target_module_id || ''
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este anuncio?')) return;
        try {
            await axios.delete(`${API_URL}/announcements/${id}`);
            toast.success('Anuncio eliminado');
            fetchData();
        } catch (error) {
            toast.error('Error al eliminar');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                target_module_id: formData.target_module_id === '' ? null : formData.target_module_id
            };

            if (editingId) {
                await axios.put(`${API_URL}/announcements/${editingId}`, payload);
                toast.success('Anuncio actualizado');
            } else {
                await axios.post(`${API_URL}/announcements`, payload);
                toast.success('Anuncio creado');
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({ title: '', content: '', is_active: true, target_module_id: '' });
            fetchData();
        } catch (error) {
            toast.error('Error al guardar');
        }
    };

    const filteredAnnouncements = announcements.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pb-20 animate-fade-in">
            <AdminHeader 
                title="Anuncios del Sistema" 
                subtitle="Gestiona los mensajes que aparecen a los usuarios al ingresar."
            />

            <div className="flex flex-col lg:flex-row gap-6">
                {/* List Section */}
                <div className="flex-grow space-y-6">
                    {/* Toolbar */}
                    <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex flex-wrap items-center justify-between gap-4">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="text"
                                placeholder="Buscar anuncios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-primary-500 transition-all"
                            />
                        </div>
                        <button 
                            onClick={() => {
                                setEditingId(null);
                                setFormData({ title: '', content: '', is_active: true, target_module_id: '' });
                                setShowForm(true);
                            }}
                            className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:shadow-lg hover:shadow-primary-500/20 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Nuevo Anuncio
                        </button>
                    </div>

                    {/* Announcements Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        {loading ? (
                            <div className="py-20 text-center">
                                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Cargando anuncios...</p>
                            </div>
                        ) : filteredAnnouncements.length === 0 ? (
                            <div className="bg-slate-900/50 p-12 rounded-3xl border border-dashed border-white/10 text-center">
                                <Bell className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-400 font-medium">No se encontraron anuncios</p>
                            </div>
                        ) : (
                            filteredAnnouncements.map(ann => (
                                <div key={ann.id} className="group bg-slate-900/50 border border-white/5 rounded-3xl p-5 hover:bg-slate-800/50 transition-all">
                                    <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                                        <div className="flex gap-4 items-start">
                                            <div className={`p-3 rounded-2xl ${ann.is_active ? 'bg-primary-500/10 text-primary-400' : 'bg-gray-500/10 text-gray-500'}`}>
                                                <Bell className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-black text-white uppercase tracking-tight">{ann.title}</h3>
                                                    {!ann.is_active && (
                                                        <span className="px-2 py-0.5 bg-gray-500/20 text-gray-500 text-[8px] font-black uppercase rounded-md border border-gray-500/20">Inactivo</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(ann.created_at).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                                                        <Target className="w-3 h-3" />
                                                        {ann.module_title ? `Módulo: ${ann.module_title}` : 'Todos los usuarios'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end md:self-center">
                                            <button 
                                                onClick={() => handleEdit(ann)}
                                                className="p-2.5 bg-white/5 hover:bg-primary-500/20 text-gray-400 hover:text-primary-400 rounded-xl transition-all"
                                                title="Editar"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(ann.id)}
                                                className="p-2.5 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl transition-all"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Form Sidebar / Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
                        <div className="relative w-full max-w-2xl bg-[#161c3a] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                                        {editingId ? 'Editar Anuncio' : 'Nuevo Anuncio'}
                                    </h2>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Configuración de notificación modal</p>
                                </div>
                                <button onClick={() => setShowForm(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Título del Mensaje</label>
                                        <input 
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            placeholder="Ej: ¡Actualización Importante!"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary-500 transition-all placeholder:text-gray-600"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Contenido (HTML soportado)</label>
                                        <textarea 
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                                            placeholder="Escribe el mensaje aquí..."
                                            rows="6"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary-500 transition-all placeholder:text-gray-600 resize-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Dirigido a:</label>
                                            <select 
                                                value={formData.target_module_id}
                                                onChange={(e) => setFormData({...formData, target_module_id: e.target.value})}
                                                className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary-500 transition-all appearance-none"
                                            >
                                                <option value="">Todos los usuarios</option>
                                                {modules.map(mod => (
                                                    <option key={mod.id} value={mod.id}>
                                                        Solo quienes terminaron Módulo {mod.module_number}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex flex-col justify-end">
                                            <div 
                                                onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                                                className="flex items-center justify-between p-3 bg-slate-800/50 border border-white/10 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all"
                                            >
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Estado: {formData.is_active ? 'Activo' : 'Inactivo'}</span>
                                                {formData.is_active ? (
                                                    <ToggleRight className="w-8 h-8 text-primary-500" />
                                                ) : (
                                                    <ToggleLeft className="w-8 h-8 text-gray-600" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 py-4 bg-white/5 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-[2] py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary-900/20 hover:shadow-primary-500/30 transition-all"
                                    >
                                        {editingId ? 'Guardar Cambios' : 'Publicar Anuncio'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const X = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
