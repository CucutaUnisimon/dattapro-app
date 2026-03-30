import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config/api';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const PerfilWizard = () => {
  const navigate = useNavigate();
  const { logout, token: authToken } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [submitResult, setSubmitResult] = useState(null);


  const methods = useForm({
    defaultValues: {
      nombre: '',
      apellidos: '',
      correo: '',
      tipoDocumento: '',
      programa: '',
      documento: '',
      facultad: '',
      tipoVinculacion: '',
      sede: '',
      perteneceCentro: 'false',
      centroInvestigativo: '',
      formaciones: [{ nivel: '', titulo: '' }],
      areas: [{ nombre: '' }],
      certificacionesNombres: [],
      experienciaServicios: '',
      proyectos: '',
      perfil: '',
      descripcionProyectos: '',
      competenciasTecnicas: [{ nombre: '', nivel: 1 }],
      competenciasTransversales: [{ nombre: '', nivel: 1 }],
      servicios: [{ nombre: '' }],
      sectores: [{ nombre: '' }],
      intereses: [{ nombre: '' }],
      areasEspecialidad: [{ nombre: '' }],
      objetivo: '',
      cvlac: '',
      linkedin: '',
      googleScholar: '',
      otraRed: '',
      idiomas: [{ idioma: '', nivel: '' }]
    },
    mode: 'onChange',
  });

  const { reset } = methods;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = authToken || localStorage.getItem('token');
        if (!token) {
          setIsLoadingData(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/usuarios/perfil/me`, {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const rawData = await response.json();

          const mappedData = {
            nombre: rawData.nombres || '',
            apellidos: rawData.apellidos || '',
            correo: rawData.correoInstitucional || '',
            tipoDocumento: rawData.tipoDocumento || '',
            programa: rawData.programaAcademico || '',
            documento: rawData.numeroIdentificacion || '',
            facultad: rawData.facultad || '',
            tipoVinculacion: rawData.tipoVinculacion || '',
            sede: rawData.sede || '',
            perteneceCentro: rawData.centroInvestigativo ? 'true' : 'false',
            centroInvestigativo: rawData.centroInvestigativo || '',

            formaciones: Array.isArray(rawData.formaciones) && rawData.formaciones.length > 0
              ? rawData.formaciones
              : [{ nivel: '', titulo: '' }],

            areas: Array.isArray(rawData.areas) && rawData.areas.length > 0
              ? rawData.areas
              : [{ nombre: '' }],

            idiomas: Array.isArray(rawData.idiomas) && rawData.idiomas.length > 0
              ? rawData.idiomas
              : [{ idioma: '', nivel: '' }],

            certificacionesNombres: Array.isArray(rawData.certificaciones)
              ? rawData.certificaciones.map(c => c.nombre || c)
              : [],

            experienciaServicios: rawData.experienciaServicios || '',

            // Corregido: En el JSON viene como "proyectos"
            proyectos: Array.isArray(rawData.proyectos)
              ? rawData.proyectos.map(p => p.nombre).join(', ')
              : (rawData.proyectosDestacados || ''),

            perfil: rawData.perfilProfesional || '',

            descripcionProyectos: rawData.descripcionProyectos || '',

            competenciasTecnicas: Array.isArray(rawData.competenciasTecnicas) && rawData.competenciasTecnicas.length > 0
              ? rawData.competenciasTecnicas
              : [{ nombre: '', nivel: 1 }],

            competenciasTransversales: Array.isArray(rawData.competenciasTransversales) && rawData.competenciasTransversales.length > 0
              ? rawData.competenciasTransversales
              : [{ nombre: '', nivel: 1 }],

            servicios: Array.isArray(rawData.servicios) && rawData.servicios.length > 0
              ? rawData.servicios
              : [{ nombre: '' }],

            // Corregido: En el JSON viene como "sectoresExperiencia"
            sectores: Array.isArray(rawData.sectoresExperiencia) && rawData.sectoresExperiencia.length > 0
              ? rawData.sectoresExperiencia
              : [{ nombre: '' }],

            intereses: Array.isArray(rawData.intereses) && rawData.intereses.length > 0
              ? rawData.intereses
              : [{ nombre: '' }],

            objetivo: rawData.objetivo || '',
            cvlac: rawData.cvlac || '',
            linkedin: rawData.linkedin || '',
            googleScholar: rawData.googleScholar || '',
            otraRed: rawData.otraRed || '',

            areasEspecialidad: Array.isArray(rawData.areasEspecialidad) && rawData.areasEspecialidad.length > 0
              ? rawData.areasEspecialidad
              : [{ nombre: '' }],

            deseaVincularse: 'true',
            autorizaDatos: 'true'
          };

          reset(mappedData);
        }
      } catch (error) {
        console.error('Error cargando los datos del perfil:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchProfileData();
  }, [reset, authToken]);

  const submitFinal = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const token = authToken || localStorage.getItem('token');

      const { certificacionesNombres, ...rest } = data;
      const formattedData = {
        ...rest,
        perfilAcademico: {
          certificacionesNombres: (certificacionesNombres || []).map(c => typeof c === 'object' ? (c.nombre || c.value) : c)
        }
      };

      const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });
      if (!response.ok) throw new Error('Error al enviar los datos');
      setSubmitResult({ success: true, message: 'Perfil actualizado exitosamente.' });
    } catch (error) {
      setSubmitResult({ success: false, message: 'Ocurrió un error al guardar cambios.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white p-12 shadow-sm rounded-3xl border border-gray-100 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-orange-50 mb-8">
            <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">¡Guardado!</h2>
          <p className="text-lg text-gray-500 mb-10">{submitResult.message}</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-[#d84e10] transition-colors shadow-md text-lg">
            Continuar
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    {
      id: 1, label: 'Consentimiento', title: 'Paso 1', icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    },
    {
      id: 2, label: 'Datos Generales', title: 'Paso 2', icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      )
    },
    {
      id: 3, label: 'Experiencia', title: 'Paso 3', icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      )
    },
    {
      id: 4, label: 'Redes e Intereses', title: 'Paso 4', icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 11-5.656 5.656l-1.102-1.101" /></svg>
      )
    }
  ];

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Wizard Progress - Local to this page */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-slate-950 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-28">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 px-2">Progreso del Perfil</p>
            <nav className="space-y-2">
              {steps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${step === s.id
                    ? 'bg-primary text-white shadow-lg shadow-orange-500/30'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400'
                    }`}
                >
                  <div className={`${step === s.id ? 'text-white' : 'text-slate-400'}`}>
                    {s.icon}
                  </div>
                  <span>{s.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* MAIN FORM AREA */}
        <div className="flex-1">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Edit Profile</h1>
            <p className="text-lg font-medium text-slate-500 leading-relaxed">
              Manage your professional identity and credentials across the datta network.
            </p>
          </div>

          {isLoadingData ? (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-24 flex flex-col items-center justify-center space-y-6">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
              <p className="text-xl text-slate-500 font-bold">Cargando información del perfil...</p>
            </div>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submitFinal)}>
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-12">
                  <div className="p-8 md:p-12 min-h-[400px]">
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-end space-x-6">
                  <button type="button" className="text-slate-500 font-bold hover:text-slate-900 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-orange-500/30 disabled:opacity-50 text-lg"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilWizard;
