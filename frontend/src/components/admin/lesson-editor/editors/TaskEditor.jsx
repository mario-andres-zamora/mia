export default function TaskEditor({ contentType, value, onChange }) {
    const getLabel = () => {
        if (contentType === 'note') return 'Aprendizaje Clave';
        if (contentType === 'heading') return 'Texto del Bloque';
        return 'Directrices de Actividad';
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">
                {getLabel()}
            </label>
            <textarea
                rows={contentType === 'heading' ? 2 : 4}
                className="w-full bg-slate-950/50 border-white/5 focus:border-primary-500 rounded-3xl p-6 text-gray-300 font-medium outline-none border transition-all placeholder:text-gray-700 leading-relaxed"
                placeholder="Define el propósito de este elemento..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}
