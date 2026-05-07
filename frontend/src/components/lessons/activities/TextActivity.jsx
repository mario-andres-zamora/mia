import React from 'react';
import DOMPurify from 'dompurify';
import { linkify } from '../../../utils/textUtils';

export default function TextActivity({ data }) {
    let textContent = data.text || '';
    if (typeof textContent === 'string') {
        textContent = textContent.replace(/\\n/g, '\n');
    }
    const isHtml = /<[a-z][\s\S]*>/i.test(textContent);

    return (
        <div className="card p-5 md:p-7 prose prose-invert prose-slate max-w-none bg-slate-800/30 border-white/5 shadow-inner animate-fade-in">
            {isHtml ? (
                <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(textContent) }}
                />
            ) : (
                <div className="text-gray-300">
                    {textContent.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={paragraph.trim() === '' ? 'h-4 m-0' : 'mb-4 leading-relaxed'}>
                            {linkify(paragraph)}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
