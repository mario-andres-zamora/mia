import React from 'react';
import { motion } from 'framer-motion';

export default function LoginHeader() {
    return (
        <div className="flex flex-col items-center text-center gap-2">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                className="w-48 h-48 md:w-56 md:h-56 relative flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
                <img
                    src="/images/Logotipo-CGR-transp.png"
                    alt="CGR Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] relative z-10"
                />
            </motion.div>

            <div className="space-y-2">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                >
                    <img
                        src="/images/logo-mia.png"
                        alt="MIA - Modelo Integrado de Aprendizaje"
                        className="w-full max-w-md object-contain"
                    />
                </motion.div>
            </div>
        </div>
    );
}
