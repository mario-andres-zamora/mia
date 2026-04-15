import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export function useDepartments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [editingDept, setEditingDept] = useState(null);
    const [newDeptName, setNewDeptName] = useState('');

    // Modal states
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deptToDelete, setDeptToDelete] = useState(null);
    const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/departments`);
            if (response.data.success) {
                setDepartments(response.data.departments);
            }
        } catch (error) {
            toast.error('Error al cargar la lista de áreas');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!newDeptName.trim()) return;
        try {
            const response = await axios.post(`${API_URL}/departments`, { name: newDeptName.trim() });
            if (response.data.success) {
                toast.success('Área creada correctamente');
                setNewDeptName('');
                setIsAdding(false);
                fetchDepartments();
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error al crear el área');
            return false;
        }
    };

    const handleUpdate = async () => {
        if (!editingDept || !editingDept.name.trim()) return;
        try {
            const response = await axios.put(`${API_URL}/departments/${editingDept.id}`, { name: editingDept.name.trim() });
            if (response.data.success) {
                toast.success('Área actualizada correctamente');
                setEditingDept(null);
                fetchDepartments();
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error al actualizar el área');
            return false;
        }
    };

    const handleConfirmDelete = async () => {
        if (!deptToDelete) return;
        try {
            const response = await axios.delete(`${API_URL}/departments/${deptToDelete.id}`);
            if (response.data.success) {
                toast.success('Área eliminada');
                setDeleteModalOpen(false);
                setDeptToDelete(null);
                fetchDepartments();
                return true;
            }
        } catch (error) {
            toast.error('Error al eliminar el área');
            return false;
        }
    };

    const handleSync = async () => {
        setIsSyncing(true);
        const toastId = toast.loading('Sincronizando con el directorio maestro...', { id: 'sync-depts' });
        try {
            const response = await axios.post(`${API_URL}/departments/sync`);
            if (response.data.success) {
                toast.success(response.data.message || 'Catálogo de áreas actualizado', { id: 'sync-depts' });
                fetchDepartments();
                return true;
            } else {
                throw new Error('Sync failed');
            }
        } catch (error) {
            toast.error('Error al sincronizar con el directorio maestro', { id: 'sync-depts' });
            return false;
        } finally {
            setIsSyncing(false);
        }
    };

    const handleDeleteAll = async () => {
        try {
            const response = await axios.post(`${API_URL}/departments/delete-all`);
            if (response.data.success) {
                toast.success('Todas las áreas han sido eliminadas');
                setDeleteAllModalOpen(false);
                fetchDepartments();
                return true;
            }
        } catch (error) {
            toast.error('Error al eliminar todas las áreas');
            return false;
        }
    };

    const filteredDepts = useMemo(() => {
        return departments.filter(d =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [departments, searchTerm]);

    return {
        departments,
        filteredDepts,
        loading,
        searchTerm,
        setSearchTerm,
        isAdding,
        setIsAdding,
        isSyncing,
        newDeptName,
        setNewDeptName,
        editingDept,
        setEditingDept,
        modals: {
            delete: {
                isOpen: deleteModalOpen,
                setOpen: setDeleteAllModalOpen, // This was a typo in previous logic? Oh wait.
                dept: deptToDelete,
                setDept: setDeptToDelete,
                confirm: handleConfirmDelete,
                close: () => setDeleteModalOpen(false),
                open: (dept) => { setDeptToDelete(dept); setDeleteModalOpen(true); }
            },
            deleteAll: {
                isOpen: deleteAllModalOpen,
                setOpen: setDeleteAllModalOpen,
                confirm: handleDeleteAll,
                close: () => setDeleteAllModalOpen(false),
                open: () => setDeleteAllModalOpen(true)
            }
        },
        actions: {
            add: handleAdd,
            update: handleUpdate,
            sync: handleSync,
            refresh: fetchDepartments
        }
    };
}
