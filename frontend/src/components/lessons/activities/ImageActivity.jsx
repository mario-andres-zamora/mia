import React from 'react';

export default function ImageActivity({ item, data, API_URL }) {
    const imgSrc = data.file_url ? `${API_URL.replace('/api', '')}${data.file_url}` : data.url;
    return (
        <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <img src={imgSrc} alt={item.title} className="w-full h-auto max-h-[600px] object-contain mx-auto" />
            </div>
        </div>
    );
}
