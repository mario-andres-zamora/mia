import React from 'react';

export default function HeadingActivity({ data }) {
    return (
        <div className="py-8 border-b border-white/5 mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase flex items-center gap-4">
                <span className="w-8 h-1 bg-primary-500 rounded-full"></span>
                {data.text || 'Sin Título'}
                <span className="flex-1 h-px bg-white/5"></span>
            </h2>
        </div>
    );
}
