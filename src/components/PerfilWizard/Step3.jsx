import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step3 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Paso 3: Perfil académico y experiencia</h2>
      
      <div className="space-y-5 bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Formación</label>
            <select 
              {...register('nivelFormacion', { required: 'El nivel de formación es requerido' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
            >
              <option value="">Seleccione su nivel...</option>
              <option value="Profesional">Profesional / Pregrado</option>
              <option value="Especializacion">Especialización</option>
              <option value="Maestria">Maestría</option>
              <option value="Doctorado">Doctorado</option>
              <option value="Posdoctorado">Posdoctorado</option>
            </select>
            {errors.nivelFormacion && <span className="text-red-500 text-xs mt-1 block">{errors.nivelFormacion.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Áreas de conocimiento</label>
            <input 
              type="text" 
              placeholder="Ej. Inteligencia Artificial, Base de Datos, Redes"
              {...register('areas', { required: 'Las áreas de conocimiento son requeridas' })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            {errors.areas && <span className="text-red-500 text-xs mt-1 block">{errors.areas.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Idiomas (y nivel)</label>
            <input 
              type="text" 
              placeholder="Ej. Inglés B2, Francés A2"
              {...register('idiomas', { required: 'Los idiomas son requeridos' })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            {errors.idiomas && <span className="text-red-500 text-xs mt-1 block">{errors.idiomas.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certificaciones Relevantes</label>
            <input 
              type="text" 
              placeholder="Ej. AWS Cloud Practitioner, Scrum Master"
              {...register('certificaciones')} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
           </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experiencia (Laboral / Investigativa)</label>
          <textarea 
            rows="3"
            placeholder="Describa brevemente sus años de experiencia y roles principales..."
            {...register('experiencia', { required: 'La experiencia es requerida' })} 
             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          ></textarea>
           {errors.experiencia && <span className="text-red-500 text-xs mt-1 block">{errors.experiencia.message}</span>}
         </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Proyectos Destacados</label>
          <textarea 
             rows="2"
             placeholder="Mencione proyectos clave en los que haya participado..."
            {...register('proyectos')} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Perfil Profesional (Breve presentación)</label>
          <textarea 
             rows="3"
             placeholder="Escriba un párrafo introduciendo quién es usted y cuál es su enfoque profesional..."
            {...register('perfil', { required: 'El perfil breve es requerido' })} 
             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
          ></textarea>
           {errors.perfil && <span className="text-red-500 text-xs mt-1 block">{errors.perfil.message}</span>}
         </div>
      </div>
    </div>
  );
};

export default Step3;
