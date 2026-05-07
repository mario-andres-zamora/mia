import React from 'react';
import { linkify } from '../../../utils/textUtils';

export default function BulletsActivity({ data }) {
    return (
        <div className="card p-5 md:p-7 prose prose-invert prose-slate max-w-none bg-slate-800/30 border-white/5 shadow-inner animate-fade-in">
            <ul className="list-disc pl-5 space-y-3 text-gray-300 marker:text-primary-500 marker:text-xl">
                {(data.items || []).map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                        {bullet.title && <strong className="text-white font-bold mr-1">{bullet.title}:</strong>}
                        <span>
                            {typeof bullet.text === 'string' 
                                ? bullet.text.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {linkify(line)}
                                        {i < bullet.text.split('\n').length - 1 && <br />}
                                    </span>
                                  )) 
                                : bullet.text
                            }
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
