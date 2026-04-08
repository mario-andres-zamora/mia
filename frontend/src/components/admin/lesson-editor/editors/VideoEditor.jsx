import { Video } from 'lucide-react';

export default function VideoEditor({ 
    videoSource, 
    onSetSource, 
    file, 
    onSetFile, 
    url, 
    onSetUrl, 
    editingItem 
}) {
    return (
        <div className="space-y-6">
            <div className="flex gap-2 p-1 bg-slate-950/50 rounded-2xl border border-white/5">
                {['file', 'url'].map((source) => (
                    <button
                        key={source}
                        type="button"
                        onClick={() => onSetSource(source)}
                        className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${videoSource === source ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-gray-600 hover:text-white'}`}
                    >
                        {source === 'file' ? 'Servidor Propio' : 'Streaming (YouTube)'}
                    </button>
                ))}
            </div>

            {videoSource === 'file' ? (
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">Archivo de Video</label>
                    <div className="p-6 bg-slate-950/50 border-2 border-dashed border-white/5 rounded-[2rem] hover:border-primary-500/30 transition-all flex flex-col items-center justify-center gap-3">
                        <input
                            type="file"
                            required={!editingItem && !editingItem?.data?.file_url}
                            id="videoFile"
                            className="hidden"
                            onChange={e => onSetFile(e.target.files[0])}
                            accept="video/*"
                        />
                        <label htmlFor="videoFile" className="flex flex-col items-center gap-2 cursor-pointer group">
                            <div className="p-4 bg-primary-500/10 rounded-full group-hover:scale-110 transition-transform">
                                <Video className="w-8 h-8 text-primary-400" />
                            </div>
                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                                {file ? file.name : editingItem?.data?.original_name || 'Subir Fragmento MP4'}
                            </span>
                        </label>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">URL YouTube</label>
                    <input
                        type="url"
                        required
                        className="w-full bg-slate-950/50 border-white/5 focus:border-primary-500 rounded-2xl p-4 text-white font-bold outline-none border transition-all"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={url}
                        onChange={e => onSetUrl(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}
