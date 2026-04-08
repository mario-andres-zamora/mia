import { Pencil, Plus, Award, Shield, Save } from 'lucide-react';
import { getTypeLabel } from './editorUtils.js';
import TextEditor from './editors/TextEditor.jsx';
import LinkEditor from './editors/LinkEditor.jsx';
import VideoEditor from './editors/VideoEditor.jsx';
import FileEditor from './editors/FileEditor.jsx';
import TaskEditor from './editors/TaskEditor.jsx';
import BulletsEditor from './editors/BulletsEditor.jsx';

export default function ContentEditorModal({ 
    isOpen, 
    onClose, 
    formData, 
    setFormData, 
    editingItem, 
    onSave 
}) {
    if (!isOpen) return null;

    const renderSpecificEditor = () => {
        switch (formData.content_type) {
            case 'text':
                return <TextEditor value={formData.data} onChange={(val) => setFormData({ ...formData, data: val })} />;
            case 'link':
                return <LinkEditor value={formData.data} onChange={(val) => setFormData({ ...formData, data: val })} />;
            case 'video':
                return (
                    <VideoEditor 
                        videoSource={formData.video_source} 
                        onSetSource={(s) => setFormData({ ...formData, video_source: s })}
                        file={formData.file}
                        onSetFile={(f) => setFormData({ ...formData, file: f })}
                        url={formData.data}
                        onSetUrl={(u) => setFormData({ ...formData, data: u })}
                        editingItem={editingItem}
                    />
                );
            case 'file':
            case 'image':
                return (
                    <FileEditor 
                        contentType={formData.content_type}
                        file={formData.file}
                        onSetFile={(f) => setFormData({ ...formData, file: f })}
                        editingItem={editingItem}
                    />
                );
            case 'quiz':
            case 'survey':
            case 'assignment':
            case 'note':
            case 'heading':
                return (
                    <TaskEditor 
                        contentType={formData.content_type}
                        value={formData.data}
                        onChange={(v) => setFormData({ ...formData, data: v })}
                    />
                );
            case 'bullets':
                return (
                    <BulletsEditor 
                        bulletItems={formData.bulletItems}
                        onChange={(items) => setFormData({ ...formData, bulletItems: items })}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-2xl bg-[#0f1425] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-slate-900 to-transparent flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter uppercase">
                            {editingItem ? <Pencil className="w-7 h-7 text-primary-400" /> : <Plus className="w-7 h-7 text-primary-400" />}
                            {editingItem ? 'Editar' : 'Arquitectar'} <span className="text-primary-400">{getTypeLabel(formData.content_type)}</span>
                        </h2>
                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest mt-1">Configuración del elemento educativo</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white">✕</button>
                </div>

                <form onSubmit={onSave} className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-primary-500 uppercase tracking-widest block ml-1">Título del Elemento</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-950/50 border-white/5 focus:border-primary-500 rounded-2xl p-4 text-white font-bold outline-none border transition-all placeholder:text-gray-700"
                            placeholder="Ej: Análisis de Riesgos Estructurales"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Specific Editor Injection */}
                    {renderSpecificEditor()}

                    {/* Rewards & Rules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/80 p-8 rounded-[2.5rem] border border-white/5">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-yellow-500 uppercase tracking-widest block ml-1 flex items-center gap-2">
                                <Award className="w-4 h-4" /> Incentivo Académico
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full bg-slate-900 border-white/10 focus:border-yellow-500 rounded-2xl p-4 text-yellow-400 font-black outline-none border transition-all text-xl"
                                    value={formData.points}
                                    onChange={e => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-600 uppercase">Puntos XP</span>
                            </div>
                        </div>

                        <div className="space-y-4 flex flex-col justify-end">
                            <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block ml-1 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> Regla de Progreso
                            </label>
                            <label className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-white/10 cursor-pointer hover:bg-slate-800 transition-all select-none group">
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.is_required ? 'bg-red-500 border-red-500 shadow-lg shadow-red-500/20' : 'border-white/10 bg-slate-950 group-hover:border-red-500/30'}`}>
                                    {formData.is_required && <Save className="w-3 h-3 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.is_required}
                                    onChange={e => setFormData({ ...formData, is_required: e.target.checked })}
                                />
                                <div className="flex flex-col">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${formData.is_required ? 'text-red-400' : 'text-gray-500 group-hover:text-gray-400'}`}>Hito Obligatorio</span>
                                    <span className="text-[8px] text-gray-600 font-bold">Bloquea el progreso hasta aprobar</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 px-6 rounded-2xl text-gray-500 hover:text-white hover:bg-white/5 transition-all font-black text-[10px] uppercase tracking-widest outline-none"
                        >
                            Abortar Cambios
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-4 px-6 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white shadow-xl shadow-primary-500/20 transition-all font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            <Save className="w-4 h-4" />
                            {editingItem ? 'Finalizar Edición' : 'Implementar Contenido'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
