import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const PerfilWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [submitResult, setSubmitResult] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const methods = useForm({
    mode: 'onChange',
  });

  const { reset } = methods;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No se encontró el token de autenticación');
          setIsLoadingData(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/v1/usuarios/perfil/me`, {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const rawData = await response.json();
          const mappedData = {
            nombre: rawData.nombres || '',
            correo: rawData.correoInstitucional || '',
            programa: rawData.programaAcademico || '',
            documento: rawData.numeroIdentificacion || '',
            facultad: rawData.facultad || '',
            tipoVinculacion: rawData.tipoVinculacion || '',
            sede: rawData.sede || '',
            perteneceCentro: rawData.perteneceCentro ? 'true' : 'false',
            centroInvestigativo: rawData.centroInvestigativo || '',
            formaciones: Array.isArray(rawData.formaciones) && rawData.formaciones.length > 0 
              ? rawData.formaciones 
              : [{ nivel: '', titulo: '' }],
            areas: rawData.areasConocimiento || '',
            idiomas: Array.isArray(rawData.idiomas) ? rawData.idiomas.join(', ') : (rawData.idiomas || ''),
            certificaciones: rawData.certificaciones || '',
            experiencia: rawData.experiencia || '',
            proyectos: rawData.proyectosDestacados || '',
            perfil: rawData.perfilProfesional || '',
            competencias: rawData.competencias || '',
            redes: rawData.redesProfesionales || '',
            servicios: rawData.serviciosOffrecidos || '',
            sectores: rawData.sectoresInteres || '',
            intereses: rawData.interesesAdicionales || '',
            objetivo: rawData.objetivoProfesional || '',
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
  }, [reset]);

  const submitFinal = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
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
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* TOP NAVBAR */}
      <nav className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight">dattapro</span>
        </div>

        <div className="flex-1 max-w-xl mx-12 hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-primary rounded-2xl py-3 pl-12 pr-4 transition-all outline-none text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary border-2 border-white rounded-full"></span>
          </button>
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          <div className="h-10 w-10 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-200">
            <img src="https://ui-avatars.com/api/?name=Investigator+Pro&background=ec5b13&color=fff" alt="User" />
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDEBAR (Mirrored from NetworkingSearch.jsx) */}
        <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col shrink-0 z-20">
          <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-gradient-to-br from-primary to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">dattapro</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {/* Main Nav Items */}
            <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary rounded-xl transition-colors font-medium">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Inicio</span>
            </Link>

            <Link to="/network" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary rounded-xl transition-colors font-medium">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Networking</span>
            </Link>

            <Link to="/convocatorias" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary rounded-xl transition-colors font-medium">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14z" />
              </svg>
              <span>Convocatorias</span>
            </Link>

            {/* WIZARD PROGRESS SECTION */}
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Wizard Progress</p>
              {steps.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${step === s.id
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
            </div>
          </div>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800 font-medium">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl mx-auto">

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
        </main>
      </div>
    </div>
  );
};

export default PerfilWizard;
