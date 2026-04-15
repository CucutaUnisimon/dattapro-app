import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Info, Calendar, Link as LinkIcon, Image as ImageIcon, Briefcase } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const ConvocatoriaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        titulo: '',
        categoria_id: '',
        descripcion: '',
        criterios_participacion: '',
        financiacion: '',
        fecha_inicio: '',
        fecha_limite: '',
        imagen_fondo: '',
        enlace: '',
        entidad_id: ''
    });

    useEffect(() => {
        if (isEdit) {
            // Fetch convocatoria data to edit
            // For now, mockup
            setFormData({
                titulo: 'Convocatoria Editada Mock',
                categoria_id: '1',
                descripcion: 'Descripción mock para edición',
                criterios_participacion: 'Criterios mock',
                financiacion: '100M',
                fecha_inicio: '2024-10-01',
                fecha_limite: '2024-12-31',
                imagen_fondo: '',
                enlace: '',
                entidad_id: '1'
            });
        }
    }, [isEdit, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', formData);
        // Lógica de envío al backend
        alert('Convocatoria guardada (Mock)');
        navigate('/mis-convocatorias');
    };

    const inputClasses = "w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#3db4ed]/10 focus:border-[#3db4ed] transition-all text-slate-700 font-medium placeholder:text-slate-400";
    const labelClasses = "block text-sm font-black text-slate-800 mb-2 ml-1 uppercase tracking-wider";

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <button 
                onClick={() => navigate('/mis-convocatorias')}
                className="flex items-center gap-2 text-slate-500 hover:text-[#3db4ed] transition-colors font-bold group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Volver a Mis Convocatorias
            </button>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            {isEdit ? 'Editar Convocatoria' : 'Crear Nueva Convocatoria'}
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">Completa los campos para publicar tu oportunidad.</p>
                    </div>
                    <div className="size-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200">
                        <Briefcase className="w-8 h-8 text-[#3db4ed]" />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-10">
                    {/* Sección: Información General */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-[#3db4ed]">
                            <Info className="w-5 h-5" />
                            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900">Información General</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Título de la Convocatoria</label>
                                <input 
                                    type="text" 
                                    name="titulo"
                                    required
                                    className={inputClasses} 
                                    placeholder="Ej: Convocatoria Nacional de Innovación 2024"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Categoría</label>
                                <select 
                                    name="categoria_id"
                                    required
                                    className={inputClasses}
                                    value={formData.categoria_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar categoría</option>
                                    <option value="1">Investigación</option>
                                    <option value="2">Innovación</option>
                                    <option value="3">Educación</option>
                                    <option value="4">Tecnología</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClasses}>Financiación</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input 
                                        type="text" 
                                        name="financiacion"
                                        className={`${inputClasses} pl-9`} 
                                        placeholder="Ej: 200M COP"
                                        value={formData.financiacion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección: Fechas y Enlaces */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-orange-500">
                            <Calendar className="w-5 h-5" />
                            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900">Fechas y Enlaces</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Fecha de Inicio</label>
                                <input 
                                    type="date" 
                                    name="fecha_inicio"
                                    className={inputClasses}
                                    value={formData.fecha_inicio}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Fecha Límite</label>
                                <input 
                                    type="date" 
                                    name="fecha_limite"
                                    required
                                    className={inputClasses}
                                    value={formData.fecha_limite}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Enlace de la Convocatoria</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="url" 
                                        name="enlace"
                                        className={`${inputClasses} pl-14`}
                                        placeholder="https://..."
                                        value={formData.enlace}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Imagen de Fondo (URL)</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input 
                                        type="url" 
                                        name="imagen_fondo"
                                        className={`${inputClasses} pl-14`}
                                        placeholder="URL de la imagen"
                                        value={formData.imagen_fondo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección: Detalles */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-indigo-500">
                            <Save className="w-5 h-5" />
                            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900">Detalles de la Oferta</h2>
                        </div>
                        
                        <div>
                            <label className={labelClasses}>Descripción</label>
                            <textarea 
                                name="descripcion"
                                rows="4"
                                className={`${inputClasses} resize-none`}
                                placeholder="Describe el propósito de la convocatoria..."
                                value={formData.descripcion}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Criterios de Participación</label>
                            <textarea 
                                name="criterios_participacion"
                                rows="4"
                                className={`${inputClasses} resize-none`}
                                placeholder="¿Quiénes pueden aplicar?"
                                value={formData.criterios_participacion}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Entidad Organizadora</label>
                            <select 
                                name="entidad_id"
                                required
                                className={inputClasses}
                                value={formData.entidad_id}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar entidad</option>
                                <option value="1">MINCIENCIAS</option>
                                <option value="2">SGR</option>
                                <option value="3">ERASMUS+</option>
                                <option value="4">DAAD</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-8 flex gap-4">
                        <button 
                            type="submit"
                            className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-slate-300 hover:bg-[#3db4ed] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                        >
                            <Save className="w-6 h-6" />
                            {isEdit ? 'Actualizar Convocatoria' : 'Publicar Convocatoria'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConvocatoriaForm;
