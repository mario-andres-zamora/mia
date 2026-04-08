export default function TextEditor({ value, onChange }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">Cuerpo del Contenido</label>
            <textarea
                required
                rows="8"
                className="w-full bg-slate-950/50 border-white/5 focus:border-primary-500 rounded-3xl p-6 text-gray-300 font-medium outline-none border transition-all placeholder:text-gray-700 leading-relaxed custom-scrollbar"
                placeholder="Redacta la información educativa aquí..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}
