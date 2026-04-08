import { Plus, Trash } from 'lucide-react';

export default function BulletsEditor({ bulletItems, onChange }) {
    const handleUpdate = (idx, field, value) => {
        const newItems = [...bulletItems];
        newItems[idx][field] = value;
        onChange(newItems);
    };

    const handleRemove = (idx) => {
        const newItems = bulletItems.filter((_, i) => i !== idx);
        if (newItems.length === 0) newItems.push({ title: '', text: '' });
        onChange(newItems);
    };

    const handleAdd = () => {
        onChange([...bulletItems, { title: '', text: '' }]);
    };

    return (
        <div className="space-y-5">
            <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">Elementos Dinámicos</label>
            {bulletItems.map((bullet, idx) => (
                <div key={idx} className="group relative bg-slate-950/50 p-6 rounded-[2rem] border border-white/5 hover:border-primary-500/20 transition-all">
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Tópico o Título"
                            className="w-full bg-transparent border-0 border-b border-white/5 focus:border-primary-500 p-0 pb-2 text-white font-black uppercase tracking-widest outline-none text-xs"
                            value={bullet.title}
                            onChange={e => handleUpdate(idx, 'title', e.target.value)}
                        />
                        <textarea
                            rows="2"
                            placeholder="Descripción ejecutiva..."
                            className="w-full bg-transparent border-0 p-0 text-gray-400 font-medium outline-none text-xs leading-relaxed resize-none"
                            value={bullet.text}
                            onChange={e => handleUpdate(idx, 'text', e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="absolute -right-3 -top-3 p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100"
                    >
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-white/5 text-gray-500 hover:text-sky-400 hover:border-sky-400/30 hover:bg-sky-400/5 transition-all text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2"
            >
                <Plus className="w-4 h-4" /> Expandir Lista
            </button>
        </div>
    );
}
