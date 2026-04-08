import React from 'react';

export default function GlitchBackground() {
    return (
        <>
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            {/* Big 404 with Glitch Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] opacity-10 pointer-events-none">
                <span className="text-[10rem] md:text-[15rem] font-black text-white tracking-widest leading-none select-none">404</span>
            </div>
        </>
    );
}
