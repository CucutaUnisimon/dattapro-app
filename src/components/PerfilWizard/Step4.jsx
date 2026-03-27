import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

const Step4 = () => {
  const { register, control, formState: { errors } } = useFormContext();

  // Field Array para Áreas de Especialidad
  const { fields: especialidadFields, append: appendEspecialidad, remove: removeEspecialidad } = useFieldArray({
    control,
    name: "areasEspecialidad"
  });

  // Field Array para Sectores de Interés (intereses)
  const { fields: interesesFields, append: appendInteres, remove: removeInteres } = useFieldArray({
    control,
    name: "intereses"
  });

  // Field Array para Competencias Técnicas
  const { fields: tecnicasFields, append: appendTecnica, remove: removeTecnica } = useFieldArray({
    control,
    name: "competenciasTecnicas"
  });

  // Field Array para Competencias Transversales
  const { fields: transversalesFields, append: appendTransversal, remove: removeTransversal } = useFieldArray({
    control,
    name: "competenciasTransversales"
  });

  const especialidadesOpciones = [
    "Educación", "Salud", "Industria", "TIC / Software", "Emprendimiento",
    "Finanzas / Contabilidad", "Derecho / Normativo", "Energía / Sostenibilidad",
    "Agroindustria", "Economía popular y comunitaria", "Logística y comercio"
  ];

  const interesesOpciones = [
    "Ofertas comerciales para empresas", "Formular y ejecutar proyectos I+D+i",
    "Realizar mentorías", "Desarrollar capacitaciones", "Consultoría", "Transferencia tecnológica"
  ];

  const tecnicasOpciones = [
    "Gestión de proyectos", "Análisis de datos", "Marketing digital",
    "Desarrollo tecnológico", "Propiedad intelectual", "Power BI / SPSS / Data Tools"
  ];

  const transversalesOpciones = [
    "Comunicación efectiva", "Trabajo colaborativo", "Adaptabilidad",
    "Liderazgo", "Orientación a resultados"
  ];

  const nivelesOpciones = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sección Competencias */}
      <section className="space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Competencias y Sectores</h2>
            <p className="text-sm text-slate-500 font-medium leading-none mt-1">Habilidades clave y áreas de impacto</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Competencias Técnicas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Competencias Técnicas</label>
              <button
                type="button"
                onClick={() => appendTecnica({ nombre: '', nivel: 1 })}
                className="text-[11px] font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Añadir Técnica
              </button>
            </div>
            <div className="space-y-3">
              {tecnicasFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 relative group animate-in slide-in-from-left-2 duration-300">
                  <select
                    {...register(`competenciasTecnicas.${index}.nombre`, { required: 'Requerido' })}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all font-semibold text-slate-700 text-xs"
                  >
                    <option value="">Competencia...</option>
                    {tecnicasOpciones.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                  <select
                    {...register(`competenciasTecnicas.${index}.nivel`, { required: 'Requerido', valueAsNumber: true })}
                    className="w-32 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all font-bold text-slate-500 text-[10px] uppercase"
                  >
                    {nivelesOpciones.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                  </select>
                  {tecnicasFields.length > 1 && (
                    <button type="button" onClick={() => removeTecnica(index)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Competencias Transversales */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Competencias Transversales</label>
              <button
                type="button"
                onClick={() => appendTransversal({ nombre: '', nivel: 1 })}
                className="text-[11px] font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Añadir Transversal
              </button>
            </div>
            <div className="space-y-3">
              {transversalesFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 relative group animate-in slide-in-from-right-2 duration-300">
                  <select
                    {...register(`competenciasTransversales.${index}.nombre`, { required: 'Requerido' })}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all font-semibold text-slate-700 text-xs"
                  >
                    <option value="">Competencia...</option>
                    {transversalesOpciones.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                  <select
                    {...register(`competenciasTransversales.${index}.nivel`, { required: 'Requerido', valueAsNumber: true })}
                    className="w-32 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all font-bold text-slate-500 text-[10px] uppercase"
                  >
                    {nivelesOpciones.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                  </select>
                  {transversalesFields.length > 1 && (
                    <button type="button" onClick={() => removeTransversal(index)} className="text-slate-300 hover:text-red-500 transition-colors p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
          {/* Sectores (intereses) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Interés en Proyectos</label>
              <button type="button" onClick={() => appendInteres({ nombre: '' })} className="text-[11px] font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Añadir
              </button>
            </div>
            <div className="space-y-3">
              {interesesFields.map((field, index) => (
                <div key={field.id} className="relative group">
                  <select {...register(`intereses.${index}.nombre`)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none text-xs font-semibold text-slate-700">
                    <option value="">Seleccione...</option>
                    {interesesOpciones.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                  {interesesFields.length > 1 && (
                    <button type="button" onClick={() => removeInteres(index)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Especialidades */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Áreas de Especialidad</label>
              <button type="button" onClick={() => appendEspecialidad({ nombre: '' })} className="text-[11px] font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Añadir
              </button>
            </div>
            <div className="space-y-3">
              {especialidadFields.map((field, index) => (
                <div key={field.id} className="relative group">
                  <select {...register(`areasEspecialidad.${index}.nombre`)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none text-xs font-semibold text-slate-700">
                    <option value="">Seleccione...</option>
                    {especialidadesOpciones.map(op => <option key={op} value={op}>{op}</option>)}
                  </select>
                  {especialidadFields.length > 1 && (
                    <button type="button" onClick={() => removeEspecialidad(index)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 p-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección Proyección */}
      <section className="space-y-8">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Proyección y Objetivos</h2>
            <p className="text-sm text-slate-500 font-medium leading-none mt-1">¿Qué buscas lograr en la red?</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Objetivos en la Red</label>
            <textarea
              rows="4"
              placeholder="Describe tus propósitos y lo que esperas aportar/obtener de la comunidad..."
              {...register('objetivo', { required: 'El objetivo es requerido' })}
              className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400 resize-none leading-relaxed shadow-sm"
            ></textarea>
            {errors.objetivo && <span className="text-red-500 text-[11px] font-bold uppercase block ml-1">{errors.objetivo.message}</span>}
          </div>

          <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10 w-2/3">
              <h4 className="font-bold text-lg mb-1 italic">¡Casi listo!</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">Revisa que toda tu información sea correcta antes de finalizar tu perfil profesional.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary rounded-full opacity-20 blur-2xl"></div>
            <div className="bg-primary/20 p-3 rounded-full border border-primary/30">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step4;
