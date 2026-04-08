import React from 'react';
import { Plus, X, Building2, Save, Edit2, Trash2 } from 'lucide-react';

export default function DeptTable({ 
    depts, 
    isAdding, 
    setIsAdding, 
    newDeptName, 
    setNewDeptName, 
    onAddSubmit, 
    editingDept, 
    setEditingDept, 
    onUpdateSubmit, 
    onDelete,
    searchTerm 
}) {
    return (
        <div className="card overflow-hidden !p-0 border-white/5 bg-slate-900/40 backdrop-blur-sm text-left">
            <table className="w-full text-left">
                <thead className="bg-slate-950/50 border-b border-white/5">
                    <tr>
                        <th className="px-6 py-4 text-[9px] font-black text-white/50 uppercase tracking-widest pl-10 w-16 text-center">ID</th>
                        <th className="px-6 py-4 text-[9px] font-black text-white/50 uppercase tracking-widest">Área / Unidad</th>
                        <th className="px-6 py-4 text-[9px] font-black text-white/50 uppercase tracking-widest text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {/* Add Form Row */}
                    {isAdding && (
                        <tr className="bg-primary-500/5 animate-in slide-in-from-top-2">
                            <td className="px-6 py-4 pl-10 text-center">
                                <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 mx-auto">
                                    <Plus className="w-4 h-4" />
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    autoFocus
                                    type="text"
                                    value={newDeptName}
                                    onChange={(e) => setNewDeptName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && onAddSubmit()}
                                    placeholder="Nombre de la nueva unidad..."
                                    className="w-full bg-slate-950 border border-primary-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 ring-primary-500/20 transition-all font-bold"
                                />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => setIsAdding(false)} className="p-2.5 text-gray-500 hover:text-white transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button onClick={onAddSubmit} className="px-6 py-2.5 bg-primary-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-primary-500/10 hover:bg-primary-400 transition-all">
                                        Guardar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}

                    {depts.length > 0 ? (
                        depts.map((dept) => (
                            <tr key={dept.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-6 py-4 pl-10 text-center">
                                    <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-[0.2em] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                                        {dept.id}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-primary-400 group-hover:scale-110 transition-all duration-300">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        {editingDept?.id === dept.id ? (
                                            <input
                                                autoFocus
                                                type="text"
                                                value={editingDept.name}
                                                onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                                                onKeyDown={(e) => e.key === 'Enter' && onUpdateSubmit()}
                                                className="flex-1 min-w-[300px] bg-slate-950 border border-primary-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 ring-primary-500/20 transition-all font-bold"
                                            />
                                        ) : (
                                            <div className="text-left">
                                                <p className="text-sm font-extrabold text-white group-hover:text-primary-300 transition-colors">{dept.name}</p>
                                                <p className="text-[10px] text-gray-500 font-medium">Unidad Administrativa</p>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {editingDept?.id === dept.id ? (
                                            <>
                                                <button
                                                    onClick={onUpdateSubmit}
                                                    className="p-3 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-xl transition-all shadow-lg"
                                                    title="Guardar"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingDept(null)}
                                                    className="p-3 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-xl transition-all"
                                                    title="Cancelar"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setEditingDept({ ...dept })}
                                                    className="p-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all shadow-lg opacity-0 group-hover:opacity-100"
                                                    title="Editar Área"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(dept)}
                                                    className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-lg opacity-0 group-hover:opacity-100"
                                                    title="Eliminar Área"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="py-24 text-center">
                                <Building2 className="w-20 h-20 text-gray-700 mx-auto mb-6 opacity-10" />
                                <h4 className="text-white font-black uppercase tracking-widest text-xs opacity-30">No se encontraron áreas</h4>
                                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-2">{searchTerm ? 'Intenta con otro término de búsqueda' : 'Sincroniza con el directorio para empezar'}</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
