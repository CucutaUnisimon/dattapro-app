import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Info, Calendar, Link as LinkIcon, Image as ImageIcon, Briefcase, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { useAuth } from '../context/AuthContext';

const ConvocatoriaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useAuth();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        titulo: '',
        categoriaId: '',
        descripcion: '',
        criteriosParticipacion: '',
        financiacion: '',
        fechaInicio: '',
        fechaLimite: '',
        imagenFondo: '',
        enlace: '',
        estado: true
    });

    const [usuarioId, setUsuarioId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserProfile();
        if (isEdit) {
            fetchConvocatoria();
        }
    }, [isEdit, id]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/perfil/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('No se pudo obtener el perfil del usuario');
            const data = await response.json();
            if (data.id) {
                setUsuarioId(data.id);
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            // No redirigimos inmediatamente para dar oportunidad de cargar si hay un token válido
        }
    };

    const fetchConvocatoria = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/convocatorias/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Error al cargar la convocatoria');
            const data = await response.json();
            setFormData({
                titulo: data.titulo || '',
                categoriaId: data.categoriaId || '',
                descripcion: data.descripcion || '',
                criteriosParticipacion: data.criteriosParticipacion || '',
                financiacion: data.financiacion || '',
                fechaInicio: data.fechaInicio || '',
                fechaLimite: data.fechaLimite || '',
                imagenFondo: data.imagenFondo || '',
                enlace: data.enlace || '',
                estado: data.estado ?? true
            });
        } catch (err) {
            setError('No se pudo cargar la información para editar');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const currentUserId = usuarioId || user?.id || localStorage.getItem('userId');

        if (!currentUserId || currentUserId === 'undefined' || currentUserId === 'null') {
            setError('Error de sesión: No se pudo identificar al usuario. Por favor, intenta cerrar sesión e ingresar nuevamente.');
            setIsSubmitting(false);
            return;
        }

        const payload = {
            ...formData,
            usuarioId: currentUserId,
            areasIds: [],
            sectoresIds: [],
            serviciosIds: [],
            tiposProyectoIds: [],
            competenciasTecnicasIds: [],
            competenciasTransversalesIds: []
        };

        try {
            const url = isEdit ? `${API_BASE_URL}/convocatorias/${id}` : `${API_BASE_URL}/convocatorias`;
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar la convocatoria');
            }

            alert(isEdit ? 'Convocatoria actualizada con éxito' : 'Convocatoria publicada con éxito');
            navigate('/mis-convocatorias');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#3db4ed]/10 focus:border-[#3db4ed] transition-all text-slate-700 font-medium placeholder:text-slate-400 disabled:opacity-50";
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
                    <input type="hidden" name="usuarioId" value={usuarioId || ''} />
                    
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
                            <X className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Sección: Información General */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-[#3db4ed]">
                            <Info className="w-5 h-5" />
                            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900">Información General</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Título de la Convocatoria *</label>
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
                                <label className={labelClasses}>Categoría *</label>
                                <select
                                    name="categoriaId"
                                    required
                                    className={inputClasses}
                                    value={formData.categoriaId}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar categoría</option>
                                    <option value="1">Arte y Cultura</option>
                                    <option value="2">Ciencia y Tecnología</option>
                                    <option value="3">Educación</option>
                                    <option value="4">Emprendimiento</option>
                                    <option value="5">Sostenibilidad</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClasses}>Financiación *</label>
                                <div className="relative">
                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="text"
                                        name="financiacion"
                                        required
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
                                    name="fechaInicio"
                                    className={inputClasses}
                                    value={formData.fechaInicio}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Fecha Límite *</label>
                                <input
                                    type="date"
                                    name="fechaLimite"
                                    required
                                    className={inputClasses}
                                    value={formData.fechaLimite}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Enlace de la Convocatoria *</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="url"
                                        name="enlace"
                                        required
                                        className={`${inputClasses} pl-14`}
                                        placeholder="https://..."
                                        value={formData.enlace}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Imagen de Fondo (Opcional)</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="url"
                                        name="imagenFondo"
                                        className={`${inputClasses} pl-14`}
                                        placeholder="URL de la imagen"
                                        value={formData.imagenFondo}
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
                            <label className={labelClasses}>Descripción (Opcional)</label>
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
                            <label className={labelClasses}>Criterios de Participación *</label>
                            <textarea
                                name="criteriosParticipacion"
                                required
                                rows="4"
                                className={`${inputClasses} resize-none`}
                                placeholder="¿Quiénes pueden aplicar?"
                                value={formData.criteriosParticipacion}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="pt-8 flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/mis-convocatorias')}
                            className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-[24px] font-black text-lg hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] bg-slate-900 text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-slate-300 hover:bg-[#3db4ed] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:bg-slate-400 disabled:translate-y-0"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Save className="w-6 h-6" />
                            )}
                            {isEdit ? 'Actualizar Convocatoria' : 'Publicar Convocatoria'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConvocatoriaForm;
