import React from 'react';

export default function AdminHeader() {
    return (
        <div className="space-y-2 mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Panel de Administración
            </h1>
            <p className="text-gray-400 font-medium">
                Bienvenido al centro de control del LMS CGR Segur@.
            </p>
        </div>
    );
}
