import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Sección */}
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Información Básica</h2>
          <p className="text-sm text-slate-500 font-medium leading-none mt-1">Detalles institucionales y de contacto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        {/* Nombre Completo */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Nombre Completo</label>
          <div className="relative group">
            <input
              type="text"
              {...register('nombre', { required: 'El nombre es requerido' })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-400"
              placeholder="Ej. Juan Pérez"
            />
            {errors.nombre && <span className="text-red-500 text-[11px] font-bold absolute -bottom-5 left-1 uppercase">{errors.nombre.message}</span>}
          </div>
        </div>

        {/* Documento */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Documento de Identificación</label>
          <div className="relative group">
            <input
              type="text"
              {...register('documento', { required: 'El documento es requerido' })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-400"
              placeholder="Ej. 1090123456"
            />
            {errors.documento && <span className="text-red-500 text-[11px] font-bold absolute -bottom-5 left-1 uppercase">{errors.documento.message}</span>}
          </div>
        </div>

        {/* Correo */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Correo Institucional</label>
          <div className="relative group">
            <input
              type="email"
              {...register('correo', {
                required: 'El correo es requerido',
                pattern: { value: /^\S+@\S+$/i, message: 'Correo inválido' }
              })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-semibold text-slate-700 placeholder:text-slate-400"
              placeholder="usuario@unisimon.edu.co"
            />
            {errors.correo && <span className="text-red-500 text-[11px] font-bold absolute -bottom-5 left-1 uppercase">{errors.correo.message}</span>}
          </div>
        </div>

        {/* Programa */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Programa Académico</label>
          <div className="relative group">
            <select
              {...register('programa', { required: 'El programa es requerido' })}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all font-semibold text-slate-700"
            >
              <option value="">Seleccione un programa...</option>
              <option value="Administración de Empresas">Administración de Empresas</option>
              <option value="Comercio y Negocios Internacionales">Comercio y Negocios Internacionales</option>
              <option value="Contaduría Pública">Contaduría Pública</option>
              <option value="Marketing y Negocios Digitales">Marketing y Negocios Digitales</option>
              <option value="Derecho">Derecho</option>
              <option value="Psicología">Psicología</option>
              <option value="Trabajo Social">Trabajo Social</option>
              <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
              <option value="Ingeniería Multimedia">Ingeniería Multimedia</option>
              <option value="Ingeniería Industrial">Ingeniería Industrial</option>
              <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
              <option value="Ingeniería de Datos e Inteligencia Artificial">Ingeniería de Datos e Inteligencia Artificial</option>
              <option value="Matemáticas y Ciencias de la Computación">Matemáticas y Ciencias de la Computación</option>
            </select>
            {/* Ícono de flecha para el select custom */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
               </svg>
            </div>
            {errors.programa && <span className="text-red-500 text-[11px] font-bold absolute -bottom-5 left-1 uppercase">{errors.programa.message}</span>}
          </div>
        </div>

        {/* Facultad */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Facultad</label>
          <select
            {...register('facultad', { required: 'La facultad es requerida' })}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all font-semibold text-slate-700"
          >
            <option value="">Seleccione una facultad...</option>
            <option value="Ingenierías">Facultad de Ingeniería</option>
            <option value="Ciencias Basicas">Facultad de Ciencias Básicas</option>
            <option value="Derecho">Facultad de Derecho</option>
            <option value="Medicina">Facultad de Medicina</option>
            <option value="Administracion">Facultad de Administración</option>
          </select>
          {errors.facultad && <span className="text-red-500 text-[11px] font-bold uppercase block ml-1">{errors.facultad.message}</span>}
        </div>

        {/* Sede */}
        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider ml-1">Sede Principal</label>
          <select
            {...register('sede', { required: 'La sede es requerida' })}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all font-semibold text-slate-700"
          >
            <option value="">Seleccione Sede...</option>
            <option value="Cúcuta">Cúcuta</option>
            <option value="Barranquilla">Barranquilla</option>
          </select>
          {errors.sede && <span className="text-red-500 text-[11px] font-bold uppercase block ml-1">{errors.sede.message}</span>}
        </div>
      </div>

      {/* Tipo de Vinculación */}
      <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Tipo de Vinculación</h3>
            <p className="text-xs text-slate-500 font-medium">Define tu relación contractual con la institución</p>
          </div>
          <div className="flex-1 max-w-xs">
            <select
              {...register('tipoVinculacion', { required: 'El tipo de vinculación es requerido' })}
              className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none transition-all font-bold text-slate-700 shadow-sm"
            >
              <option value="">Seleccione...</option>
              <option value="Tiempo Completo">Tiempo Completo</option>
              <option value="Medio Tiempo">Medio Tiempo</option>
              <option value="Planta tiempo completo">Planta tiempo completo</option>
              <option value="Planta medio tiempo">Planta medio tiempo</option>
              <option value="Catedratico">Catedrático</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
