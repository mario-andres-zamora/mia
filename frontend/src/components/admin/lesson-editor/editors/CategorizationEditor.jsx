import React from 'react';
import { Plus, Trash2, LayoutGrid, Tag, Info } from 'lucide-react';

export default function CategorizationEditor({ formData, setFormData }) {
    const categories = formData.categories || [];
    const items = formData.items || [];

    const handleAddCategory = () => {
        const newCategories = [
            ...categories, 
            { id: Date.now().toString(), label: '', sublabel: '', icon: 'package' }
        ];
        setFormData({ ...formData, categories: newCategories });
    };

    const handleRemoveCategory = (index) => {
        const categoryId = categories[index].id;
        const newCategories = categories.filter((_, i) => i !== index);
        // Also remove items belonging to this category or reset them
        const newItems = items.map(item => 
            item.categoryId === categoryId ? { ...item, categoryId: '' } : item
        );
        setFormData({ ...formData, categories: newCategories, items: newItems });
    };

    const handleUpdateCategory = (index, field, value) => {
        const newCategories = categories.map((cat, i) => 
            i === index ? { ...cat, [field]: value } : cat
        );
        setFormData({ ...formData, categories: newCategories });
    };

    const handleAddItem = () => {
        const newItem = { id: Date.now().toString(), text: '', categoryId: categories[0]?.id || '' };
        setFormData({ ...formData, items: [...items, newItem] });
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const handleUpdateItem = (index, field, value) => {
        const newItems = items.map((item, i) => 
            i === index ? { ...item, [field]: value } : item
        );
        setFormData({ ...formData, items: newItems });
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Instruction */}
            <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                    <Info className="w-3 h-3 text-primary-400" /> Instrucción de la Actividad
                </label>
                <textarea
                    className="w-full bg-[#0a0d18] border border-white/5 focus:border-primary-500/50 rounded-xl py-3 px-4 text-white text-sm min-h-[80px] outline-none transition-all resize-none"
                    placeholder="Ej: Arrastra cada elemento a la categoría que corresponda..."
                    value={formData.data || ''}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                />
            </div>

            {/* Categories Configuration */}
            <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <LayoutGrid className="w-3 h-3 text-emerald-400" /> Categorías (Destinos)
                    </label>
                    <button
                        type="button"
                        onClick={handleAddCategory}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Añadir Categoría
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {categories.length === 0 && (
                        <div className="text-center py-6 bg-black/20 rounded-2xl border border-dashed border-white/5">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No hay categorías configuradas</p>
                        </div>
                    )}
                    
                    {categories.map((category, index) => (
                        <div key={category.id} className="flex gap-3 items-start group bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-gray-600 uppercase ml-1">Nombre</span>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-white/5 focus:border-emerald-500/30 rounded-xl py-2 px-3 text-white text-xs outline-none transition-all"
                                        placeholder="Ej: Comprender"
                                        value={category.label}
                                        onChange={(e) => handleUpdateCategory(index, 'label', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-gray-600 uppercase ml-1">Subtítulo / Meta</span>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-white/5 focus:border-emerald-500/30 rounded-xl py-2 px-3 text-white text-xs outline-none transition-all"
                                        placeholder="Ej: 10%"
                                        value={category.sublabel}
                                        onChange={(e) => handleUpdateCategory(index, 'sublabel', e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveCategory(index)}
                                className="mt-5 p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Items Configuration */}
            <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Tag className="w-3 h-3 text-orange-400" /> Banco de Conceptos (Draggables)
                    </label>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
                    >
                        <Plus className="w-3 h-3" /> Añadir Concepto
                    </button>
                </div>

                <div className="space-y-3">
                    {items.length === 0 && (
                        <div className="text-center py-6 bg-black/20 rounded-2xl border border-dashed border-white/5">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No hay conceptos configurados</p>
                        </div>
                    )}
                    
                    {items.map((item, index) => (
                        <div key={item.id} className="flex gap-3 items-start group bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                            <div className="flex-1 space-y-3">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-gray-600 uppercase ml-1">Texto del Concepto</span>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-white/5 focus:border-orange-500/30 rounded-xl py-2 px-3 text-white text-xs outline-none transition-all"
                                        placeholder="Ej: Micro-aprendizajes y recursos ágiles"
                                        value={item.text}
                                        onChange={(e) => handleUpdateItem(index, 'text', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-gray-600 uppercase ml-1">Categoría Correcta</span>
                                    <select
                                        className="w-full bg-black/40 border border-white/5 focus:border-orange-500/30 rounded-xl py-2 px-3 text-white text-xs outline-none transition-all"
                                        value={item.categoryId}
                                        onChange={(e) => handleUpdateItem(index, 'categoryId', e.target.value)}
                                    >
                                        <option value="">Seleccione categoría...</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.label || '(Sin nombre)'}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="mt-5 p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Feedbacks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest ml-1">Feedback Éxito</label>
                    <input
                        className="w-full bg-[#0a0d18] border border-white/5 focus:border-emerald-500/50 rounded-xl py-2.5 px-4 text-white text-xs outline-none transition-all"
                        placeholder="Ej: ¡Excelente! Has comprendido..."
                        value={formData.feedbackSuccess || ''}
                        onChange={(e) => setFormData({ ...formData, feedbackSuccess: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-red-400 uppercase tracking-widest ml-1">Feedback Error</label>
                    <input
                        className="w-full bg-[#0a0d18] border border-white/5 focus:border-red-500/50 rounded-xl py-2.5 px-4 text-white text-xs outline-none transition-all"
                        placeholder="Ej: Algunos elementos no están en su fase..."
                        value={formData.feedbackError || ''}
                        onChange={(e) => setFormData({ ...formData, feedbackError: e.target.value })}
                    />
                </div>
            </div>

            <div className="p-4 bg-primary-500/5 rounded-2xl border border-primary-500/10">
                <p className="text-[10px] text-primary-400/80 leading-relaxed font-medium italic">
                    <span className="font-bold">Sugerencia:</span> Define primero las categorías y luego añade los conceptos asignándoles su categoría correspondiente.
                </p>
            </div>
        </div>
    );
}
