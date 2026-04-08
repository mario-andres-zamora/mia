import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import { useDepartments } from '../hooks/useDepartments';
import { Search } from 'lucide-react';

// Modular Components
import DeptHeader from '../components/admin/departments/DeptHeader';
import DeptTable from '../components/admin/departments/DeptTable';

export default function AdminDepartments() {
    const navigate = useNavigate();
    const {
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
        modals,
        actions
    } = useDepartments();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] animate-fade-in text-center px-4">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Cargando catálogo de áreas...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
            {/* Header */}
            <DeptHeader 
                onBack={() => navigate('/admin')}
                onSync={actions.sync}
                onDeleteAll={modals.deleteAll.open}
                onAdd={() => setIsAdding(true)}
                isSyncing={isSyncing}
                hasDepts={filteredDepts.length > 0}
            />

            {/* Search and List */}
            <div className="space-y-6">
                <div className="relative group text-left">
                    <div className="absolute inset-0 bg-primary-500/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar área por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full relative z-10 pl-14 pr-6 py-4 bg-slate-900/40 border border-white/5 rounded-2xl text-white text-sm font-medium focus:outline-none focus:border-primary-500/50 transition-all shadow-2xl"
                    />
                </div>

                <DeptTable 
                    depts={filteredDepts}
                    isAdding={isAdding}
                    setIsAdding={setIsAdding}
                    newDeptName={newDeptName}
                    setNewDeptName={setNewDeptName}
                    onAddSubmit={actions.add}
                    editingDept={editingDept}
                    setEditingDept={setEditingDept}
                    onUpdateSubmit={actions.update}
                    onDelete={modals.delete.open}
                    searchTerm={searchTerm}
                />
            </div>

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={modals.delete.isOpen}
                onClose={modals.delete.close}
                onConfirm={modals.delete.confirm}
                title="Eliminar Área"
                message={`¿Estás seguro de que deseas eliminar el área "${modals.delete.dept?.name}"? Esto no afectará a los usuarios que ya la tienen asignada, pero dejará de aparecer en la lista de selección.`}
                confirmText="Eliminar"
                isDestructive={true}
            />

            {/* Confirm Delete All Modal */}
            <ConfirmModal
                isOpen={modals.deleteAll.isOpen}
                onClose={modals.deleteAll.close}
                onConfirm={modals.deleteAll.confirm}
                title="¿Eliminar TODAS las áreas?"
                message="Esta acción eliminará por completo el catálogo de áreas. Esto no afectará a los usuarios que ya tienen un área asignada, pero el catálogo quedará vacío. ¿Estás seguro?"
                confirmText="Sí, eliminar todo"
                isDestructive={true}
            />
        </div>
    );
}
