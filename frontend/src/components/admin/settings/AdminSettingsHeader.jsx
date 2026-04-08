import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminSettingsHeader({ tabs, activeTab, onTabChange, onSave, saving }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-900/60 px-8 py-6 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-xl animate-fade-in mb-8">
            <div className="flex items-center gap-5">
                <button
                    onClick={() => navigate('/admin')}
                    className="p-4 bg-slate-950/50 hover:bg-white/10 rounded-2xl transition-all text-gray-500 hover:text-white border border-white/5 group shadow-inner"
                    title="Volver al Panel"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-white italic uppercase tracking-tight leading-none mb-1">Centro de Parametrización</h1>
                    <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.4em] leading-none opacity-80">Configuración Holística del Sistema</p>
                </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2.5xl border border-white/5 shadow-inner">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab.id
                            ? 'bg-primary-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] border border-primary-400/20'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'animate-pulse' : 'opacity-40 group-hover:opacity-100'}`} />
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            <button
                onClick={onSave}
                disabled={saving}
                className="w-full md:w-auto px-10 py-3.5 bg-primary-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary-500 transition-all shadow-2xl shadow-primary-500/30 flex items-center justify-center gap-4 disabled:opacity-50 active:scale-95 group border border-primary-500/20"
            >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 group-hover:scale-125 transition-transform" />}
                Guardar Configuración
            </button>
        </div>
    );
}
