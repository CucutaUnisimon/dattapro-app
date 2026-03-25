import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step4 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Paso 4: Competencias, Redes e Intereses</h2>
      
      <div className="space-y-5 bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Competencias Principales</label>
          <input 
            type="text" 
             placeholder="Ej. Análisis de Datos, Liderazgo, Desarrollo Ágil"
            {...register('competencias', { required: 'Las competencias son requeridas' })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          {errors.competencias && <span className="text-red-500 text-xs mt-1 block">{errors.competencias.message}</span>}
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Redes Profesionales (LinkedIn, ORCID, GitHub, etc.)</label>
          <textarea 
             rows="2"
             placeholder="Pegue los enlaces a sus perfiles profesionales..."
             {...register('redes')} 
             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Portafolio / Servicios que ofrece</label>
           <textarea 
            rows="2"
            placeholder="¿Qué servicios de consultoría o investigación puede prestar?"
             {...register('servicios')} 
             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          ></textarea>
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sectores de interés</label>
            <input 
              type="text" 
              placeholder="Ej. Tecnología, Educación, Salud"
               {...register('sectores', { required: 'Los sectores son requeridos' })} 
               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            {errors.sectores && <span className="text-red-500 text-xs mt-1 block">{errors.sectores.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Intereses Adicionales</label>
            <input 
               type="text" 
               placeholder="Ej. Emprendimiento, Innovación Social"
              {...register('intereses', { required: 'Los intereses son requeridos' })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            {errors.intereses && <span className="text-red-500 text-xs mt-1 block">{errors.intereses.message}</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo Profesional / Expectativas</label>
          <textarea 
            rows="3"
            placeholder="¿Qué espera lograr al vincularse a la red o cuáles son sus propósitos?"
             {...register('objetivo', { required: 'El objetivo es requerido' })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          ></textarea>
          {errors.objetivo && <span className="text-red-500 text-xs mt-1 block">{errors.objetivo.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Step4;
