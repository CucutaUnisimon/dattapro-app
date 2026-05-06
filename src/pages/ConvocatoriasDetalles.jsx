import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { ArrowLeft, Calendar, Link as LinkIcon, DollarSign, Info, FileText, CheckCircle, Target, Users, Mail, Building, Briefcase } from 'lucide-react';
import techImg from '../assets/convocatorias/tech.png';

const ConvocatoriasDetalles = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [convocatoria, setConvocatoria] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchConvocatoria();
    }, [id]);

    const fetchConvocatoria = async () => {
        setIsLoading(true);
        try {
            // Se puede acceder públicamente
            const response = await fetch(`${API_BASE_URL}/convocatorias/${id}`);
            if (!response.ok) throw new Error('Error al cargar los detalles de la convocatoria');
            const data = await response.json();
            setConvocatoria(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3db4ed]"></div>
            </div>
        );
    }

    if (error || !convocatoria) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <p className="text-red-500 font-medium">{error || 'No se encontró la convocatoria'}</p>
                <button 
                    onClick={() => navigate('/convocatorias')}
                    className="text-[#3db4ed] hover:underline font-bold"
                >
                    Volver a Convocatorias
                </button>
            </div>
        );
    }

    const renderList = (title, items, icon) => {
        if (!items || items.length === 0) return null;
        return (
            <div className="mb-6">
                <h3 className="text-sm font-black text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
                    {icon}
                    {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {items.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-200">
                            {typeof item === 'string' ? item : item.nombre}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const status = calculateStatus(convocatoria.fechaInicio, convocatoria.fechaLimite);

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header / Nav */}
            <button
                onClick={() => navigate('/convocatorias')}
                className="flex items-center gap-2 text-slate-500 hover:text-[#3db4ed] transition-colors font-bold group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Volver a Convocatorias
            </button>

            {/* Main Content Card */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                {/* Image Banner */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-900">
                    <img 
                        src={convocatoria.imagenFondo || techImg} 
                        alt={convocatoria.titulo}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-white">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {convocatoria.categoria?.nombre && (
                                <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-lg">
                                    {convocatoria.categoria.nombre}
                                </span>
                            )}
                            <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg ${status === 'Abierta' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                                {status}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight drop-shadow-lg">
                            {convocatoria.titulo}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 font-medium max-w-3xl drop-shadow-md">
                            {convocatoria.subtipo && `${convocatoria.subtipo} `}
                            {convocatoria.entidad?.nombre && `| ${convocatoria.entidad.nombre}`}
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column (Main Info) */}
                    <div className="lg:col-span-2 space-y-10">
                        {convocatoria.descripcion && (
                            <section>
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-[#3db4ed]" />
                                    Descripción
                                </h2>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {convocatoria.descripcion}
                                </p>
                            </section>
                        )}

                        {convocatoria.criteriosParticipacion && (
                            <section>
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Users className="w-6 h-6 text-orange-500" />
                                    Criterios de Participación
                                </h2>
                                <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl text-orange-900 leading-relaxed whitespace-pre-wrap">
                                    {convocatoria.criteriosParticipacion}
                                </div>
                            </section>
                        )}

                        {convocatoria.procesoEvaluacion && (
                            <section>
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-purple-500" />
                                    Proceso de Evaluación
                                </h2>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    {convocatoria.procesoEvaluacion}
                                </p>
                            </section>
                        )}

                        {convocatoria.resultadosEsperados && (
                            <section>
                                <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    Resultados Esperados
                                </h2>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    {convocatoria.resultadosEsperados}
                                </p>
                            </section>
                        )}

                        {/* Etiquetas y Categorías (Badges) */}
                        <section className="space-y-4 pt-4 border-t border-slate-100">
                            {renderList("Palabras Clave", convocatoria.keywords, <Target className="w-4 h-4 text-sky-500" />)}
                            {renderList("Líneas de Investigación", convocatoria.lineasInvestigacion, <FileText className="w-4 h-4 text-indigo-500" />)}
                            {renderList("Áreas de Conocimiento", convocatoria.areas, <Info className="w-4 h-4 text-emerald-500" />)}
                            {renderList("Áreas de Especialidad", convocatoria.areasEspecialidad, <Info className="w-4 h-4 text-emerald-400" />)}
                            {renderList("Sectores de Experiencia", convocatoria.sectores, <Briefcase className="w-4 h-4 text-orange-500" />)}
                            {renderList("Tipos de Servicios", convocatoria.servicios, <Info className="w-4 h-4 text-purple-500" />)}
                            {renderList("Tipos de Proyecto", convocatoria.tiposProyecto, <Target className="w-4 h-4 text-red-500" />)}
                            {renderList("Competencias Técnicas", convocatoria.competenciasTecnicas, <Info className="w-4 h-4 text-blue-500" />)}
                            {renderList("Competencias Transversales", convocatoria.competenciasTransversales, <Users className="w-4 h-4 text-pink-500" />)}
                        </section>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-6">
                            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-4">Resumen</h3>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                                    <DollarSign className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Financiación</p>
                                    <p className="text-sm font-black text-slate-900">{convocatoria.financiacion}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                                    <Calendar className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Fecha Límite</p>
                                    <p className="text-sm font-black text-red-600">{convocatoria.fechaLimite}</p>
                                </div>
                            </div>

                            {convocatoria.fechaInicio && (
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Fecha Inicio</p>
                                        <p className="text-sm font-bold text-slate-700">{convocatoria.fechaInicio}</p>
                                    </div>
                                </div>
                            )}

                            {convocatoria.enlace && (
                                <a 
                                    href={convocatoria.enlace}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 flex items-center justify-center gap-2 w-full bg-[#3db4ed] text-white py-4 rounded-2xl font-black shadow-lg shadow-[#3db4ed]/30 hover:bg-sky-400 transition-all hover:-translate-y-1 active:scale-95"
                                >
                                    <LinkIcon className="w-5 h-5" />
                                    Sitio Oficial
                                </a>
                            )}
                        </div>

                        {/* Contact Card */}
                        {(convocatoria.contactoNombre || convocatoria.contactoCorreo || convocatoria.contactoDependencia) && (
                            <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-5">
                                <h3 className="font-black text-indigo-900 uppercase tracking-widest text-sm mb-4">Contacto</h3>
                                
                                {convocatoria.contactoNombre && (
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-indigo-400" />
                                        <span className="text-sm font-bold text-indigo-900">{convocatoria.contactoNombre}</span>
                                    </div>
                                )}
                                
                                {convocatoria.contactoCorreo && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-indigo-400" />
                                        <a href={`mailto:${convocatoria.contactoCorreo}`} className="text-sm font-bold text-[#3db4ed] hover:underline">
                                            {convocatoria.contactoCorreo}
                                        </a>
                                    </div>
                                )}

                                {convocatoria.contactoDependencia && (
                                    <div className="flex items-center gap-3">
                                        <Building className="w-5 h-5 text-indigo-400" />
                                        <span className="text-sm font-bold text-indigo-900">{convocatoria.contactoDependencia}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Util function to calculate status
function calculateStatus(inicio, limite) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateLimite = new Date(limite);
    dateLimite.setHours(0, 0, 0, 0);

    if (inicio) {
        const dateInicio = new Date(inicio);
        dateInicio.setHours(0, 0, 0, 0);
        if (today >= dateInicio && today <= dateLimite) return 'Abierta';
    } else if (today <= dateLimite) {
        return 'Abierta';
    }
    return 'Cerrada';
}

export default ConvocatoriasDetalles;
