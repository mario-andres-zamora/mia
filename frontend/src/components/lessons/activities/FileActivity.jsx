import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function FileActivity({ item, data, API_URL, handleResourceDownload }) {
    const fileLink = data.file_url ? `${API_URL.replace('/api', '')}${data.file_url}` : '#';
    return (
        <a
            href={fileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            onClick={() => handleResourceDownload(item.id, item.title)}
        >
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-800/40 border border-white/5 hover:bg-slate-800 hover:border-red-500/40 transition-all">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)] group-hover:scale-110 transition-transform border border-red-500/20">
                    <FileText className="w-7 h-7" />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        {data.original_name || 'Documento adjunto'}
                        {data.size && <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400">{(data.size / 1024 / 1024).toFixed(2)} MB</span>}
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                    <Download className="w-5 h-5" />
                </div>
            </div>
        </a>
    );
}
