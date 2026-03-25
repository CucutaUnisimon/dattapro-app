import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const PerfilWizard = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const methods = useForm({
    mode: 'onChange',
  });

  const submitFinal = async (data) => {
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
      
      const response = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar los datos al servidor');
      }
      
      console.log('Datos enviados correctamente:', data);
      setSubmitResult({ success: true, message: 'Perfil de investigador creado exitosamente. ¡Gracias por vincularse!' });
    } catch (error) {
      console.error('Error procesando el perfil:', error);
      setSubmitResult({ success: false, message: 'Ocurrió un error al enviar los datos. Intente nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white p-12 shadow-sm rounded-3xl border border-gray-100 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-cyan-50 mb-8">
            <svg className="h-12 w-12 text-[#00a3e0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">¡Perfil Completado!</h2>
          <p className="text-lg text-gray-500 mb-10">{submitResult.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3.5 bg-[#00a3e0] text-white font-bold rounded-xl hover:bg-[#008cc0] transition-colors shadow-md text-lg"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, label: 'Consentimiento', title: 'Paso 1' },
    { id: 2, label: 'Datos Generales', title: 'Paso 2' },
    { id: 3, label: 'Perfil y Experiencia', title: 'Paso 3' },
    { id: 4, label: 'Redes e Intereses', title: 'Paso 4' }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col xl:flex-row bg-[#F8F9FA] font-sans">
      
      {/* LEFT SIDEBAR */}
      <div className="w-full xl:w-[320px] 2xl:w-[380px] bg-white border-r border-gray-200 p-8 xl:p-10 flex flex-col justify-between shrink-0 h-auto xl:h-screen sticky top-0">
        <div>
          {/* Logo container */}
          <div className="flex items-center space-x-3 mb-10 xl:mb-16">
            <div className="w-10 h-10 bg-[#00a3e0] rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">dattapro</span>
          </div>
          
          {/* Stepper */}
          <div className="space-y-6 xl:space-y-10 grid grid-cols-2 xl:grid-cols-1 gap-4 xl:gap-0">
            {steps.map(s => (
              <div 
                key={s.id} 
                className="flex items-start cursor-pointer group"
                onClick={() => setStep(s.id)}
              >
                <div className={`mt-1 w-12 h-12 flex items-center justify-center rounded-full shrink-0 font-bold text-lg transition-all ${
                  step === s.id 
                    ? 'bg-[#00a3e0] text-white shadow-md transform scale-105' 
                    : step > s.id 
                      ? 'bg-blue-50 text-[#00a3e0]' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.id ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    s.id
                  )}
                </div>
                <div className="ml-4 flex flex-col justify-center">
                  <span className={`text-sm font-bold tracking-wide uppercase mb-0.5 ${step === s.id ? 'text-[#00a3e0]' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
                  <span className={`text-base font-semibold leading-tight ${step === s.id ? 'text-gray-900' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo card */}
        <div className="hidden xl:block mt-12 bg-gradient-to-br from-[#00c6ff] to-[#0072ff] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
          <div className="relative z-10">
            <h3 className="font-extrabold text-xl mb-2">Join 10k+ Researchers</h3>
            <p className="text-sm font-medium text-blue-50 leading-relaxed">
              Collaborate with peers worldwide on cutting-edge scientific projects.
            </p>
          </div>
          {/* Faint Background Icon */}
          <svg className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-start p-6 md:p-12 lg:p-16 xl:p-20 overflow-y-auto">
        
        {/* Header container */}
        <div className="w-full max-w-4xl mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Create your account</h1>
          <p className="text-lg md:text-xl font-medium text-gray-500">Start your journey into the global researcher network.</p>
        </div>

        {/* Main Form Card */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 p-8 md:p-12 mb-16 relative">
          {submitResult && !submitResult.success && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl">
              <p className="font-bold">Error</p>
              <p className="text-sm font-medium">{submitResult.message}</p>
            </div>
          )}

          {isSubmitting ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-6 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00a3e0]"></div>
              <p className="text-xl text-gray-600 font-bold">Creando cuenta en la plataforma...</p>
            </div>
          ) : (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submitFinal)}>
                <div className="min-h-[300px] pb-10 mb-8 border-b border-gray-100">
                  {/* Render active step */}
                  {step === 1 && <Step1 />}
                  {step === 2 && <Step2 />}
                  {step === 3 && <Step3 />}
                  {step === 4 && <Step4 />}
                </div>

                {/* Form Footer Actions */}
                <div className="flex flex-col md:flex-row items-end justify-end">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-12 py-4 bg-[#00a3e0] text-white font-extrabold rounded-2xl hover:bg-[#008cc0] transition-all flex items-center justify-center shadow-lg shadow-[#00a3e0]/30 text-lg tracking-wide hover:-translate-y-0.5"
                  >
                    Guardar
                    <svg className="w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
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
