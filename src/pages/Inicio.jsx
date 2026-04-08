import React from 'react';

const Inicio = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Inicio</h1>
        <p className="text-lg font-medium text-slate-500 leading-relaxed">
          Bienvenido a la plataforma Dattapro.
        </p>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center h-[500px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Panel de Inicio</h2>
        <p className="text-slate-500">Pronto se agregarán métricas y accesos rápidos en esta vista.</p>
      </div>
    </div>
  );
};

export default Inicio;
