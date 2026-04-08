import { Image as ImageIcon, Plus } from 'lucide-react';

export default function FileEditor({ 
    contentType, 
    file, 
    onSetFile, 
    editingItem 
}) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">Archivo de Recurso</label>
            <div className="p-10 bg-slate-950/50 border-2 border-dashed border-white/5 rounded-[2.5rem] hover:border-primary-500/30 transition-all flex flex-col items-center justify-center gap-4">
                <input
                    type="file"
                    required={!editingItem}
                    id="contentFile"
                    className="hidden"
                    onChange={e => onSetFile(e.target.files[0])}
                    accept={contentType === 'image' ? 'image/*' : '*/*'}
                />
                <label htmlFor="contentFile" className="flex flex-col items-center gap-3 cursor-pointer group">
                    <div className="p-5 bg-primary-500/10 rounded-[1.5rem] group-hover:scale-110 transition-transform border border-primary-500/10 shadow-lg shadow-primary-500/5">
                        {contentType === 'image' ? <ImageIcon className="w-10 h-10 text-purple-400" /> : <Plus className="w-10 h-10 text-orange-400" />}
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">
                            {file ? file.name : editingItem?.data?.original_name || 'Seleccionar Archivo'}
                        </p>
                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Máximo servidor: 50MB</p>
                    </div>
                </label>
            </div>
        </div>
    );
}
