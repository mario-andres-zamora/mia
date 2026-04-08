import React from 'react';
import { Home } from 'lucide-react';
import CyberCat from '../CyberCat';

export default function PanicMessage({ onBack }) {
    return (
        <div className="max-w-xl w-full text-center space-y-8 relative z-10">
            {/* Cybersecurity White Cat - Panic Mode */}
            <div className="relative inline-block group">
                <div className="absolute inset-0 bg-red-500/20 blur-[60px] rounded-full scale-110 animate-pulse"></div>
                <CyberCat 
                    className="w-48 h-48 md:w-64 lg:w-80 md:h-64 lg:h-80 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-float"
                    variant="panic"
                />
            </div>

            {/* Big 500 with Glitch Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] opacity-10 pointer-events-none">
                <span className="text-[15rem] font-black text-white tracking-widest leading-none">500</span>
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    ¡Houston... <span className="text-red-500 font-black">tenemos un lío!</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-md mx-auto leading-tight">
                    Parece que el servidor ha entrado en pánico. Nuestra gata cibersegura está tratando de apagar el fuego, pero por ahora <span className="text-white">"el sistema necesita un respiro"</span>.
                </p>
            </div>

            <div className="pt-6">
                <button
                    onClick={onBack}
                    className="group relative flex items-center justify-center gap-4 px-12 py-5 bg-red-600 rounded-[2rem] text-sm font-black uppercase tracking-widest text-white shadow-[0_20px_40px_rgba(220,38,38,0.3)] hover:shadow-[0_25px_50px_rgba(220,38,38,0.5)] hover:-translate-y-1 active:scale-95 transition-all w-full md:w-auto mx-auto"
                >
                    <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Regresar a salvo
                </button>

                <p className="mt-8 text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em]">
                    Código de Error: SYSTEM_OVERLOAD_MEOW
                </p>
            </div>
        </div>
    );
}
