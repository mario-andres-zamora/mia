import { Link as LinkIcon } from 'lucide-react';

export default function LinkEditor({ value, onChange }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">Destino URL</label>
            <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                <input
                    type="url"
                    required
                    className="w-full bg-slate-950/50 border-white/5 focus:border-primary-500 rounded-2xl p-4 pl-12 text-blue-400 font-bold outline-none border transition-all placeholder:text-gray-700"
                    placeholder="https://recurso-educativo.com"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}
