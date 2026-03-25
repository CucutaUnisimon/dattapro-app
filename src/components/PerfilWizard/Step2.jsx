import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2 = () => {
  const { register, watch, formState: { errors } } = useFormContext();

  const perteneceCentro = watch('perteneceCentro');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Paso 2: Datos Generales</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input 
            type="text" 
            {...register('nombre', { required: 'El nombre es requerido' })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Ej. Juan Pérez"
          />
          {errors.nombre && <span className="text-red-500 text-xs mt-1 block">{errors.nombre.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Documento de Identidad</label>
          <input 
            type="text" 
            {...register('documento', { required: 'El documento es requerido' })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Ej. 123456789"
          />
          {errors.documento && <span className="text-red-500 text-xs mt-1 block">{errors.documento.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input 
            type="email" 
            {...register('correo', { 
              required: 'El correo es requerido',
              pattern: { value: /^\S+@\S+$/i, message: 'Correo inválido' }
            })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="ejemplo@correo.com"
          />
          {errors.correo && <span className="text-red-500 text-xs mt-1 block">{errors.correo.message}</span>}
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Facultad</label>
          <select 
            {...register('facultad', { required: 'La facultad es requerida' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
          >
            <option value="">Seleccione una facultad...</option>
            <option value="Ingenieria">Ingeniería</option>
            <option value="Derecho">Derecho</option>
            <option value="Salud">Salud</option>
            <option value="Administracion y Negocios">Administración y Negocios</option>
            <option value="Ciencias Basicas">Ciencias Básicas</option>
          </select>
          {errors.facultad && <span className="text-red-500 text-xs mt-1 block">{errors.facultad.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Programa</label>
          <input 
            type="text" 
            {...register('programa', { required: 'El programa es requerido' })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Ej. Ingeniería de Sistemas"
          />
          {errors.programa && <span className="text-red-500 text-xs mt-1 block">{errors.programa.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vinculación</label>
          <select 
            {...register('tipoVinculacion', { required: 'El tipo de vinculación es requerido' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
          >
            <option value="">Seleccione...</option>
            <option value="Tiempo Completo">Tiempo Completo</option>
            <option value="Medio Tiempo">Medio Tiempo</option>
            <option value="Catedra">Cátedra</option>
            <option value="Ocasional">Ocasional</option>
          </select>
          {errors.tipoVinculacion && <span className="text-red-500 text-xs mt-1 block">{errors.tipoVinculacion.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sede</label>
          <select 
            {...register('sede', { required: 'La sede es requerida' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
          >
            <option value="">Seleccione una sede...</option>
            <option value="Cucuta">Cúcuta</option>
            <option value="Bogota">Bogotá</option>
            <option value="Barranquilla">Barranquilla</option>
          </select>
          {errors.sede && <span className="text-red-500 text-xs mt-1 block">{errors.sede.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Pertenece a un Centro Investigativo?</label>
          <div className="flex space-x-6">
             <label className="flex items-center cursor-pointer">
              <input type="radio" value="true" {...register('perteneceCentro', { required: 'Requerido' })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <span className="text-gray-700">Sí</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="false" {...register('perteneceCentro', { required: 'Requerido' })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <span className="text-gray-700">No</span>
            </label>
          </div>
          {errors.perteneceCentro && <span className="text-red-500 text-xs mt-1 block">{errors.perteneceCentro.message}</span>}
        </div>

        {perteneceCentro === 'true' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Centro Investigativo</label>
            <input 
               type="text" 
              {...register('centroInvestigativo', { required: perteneceCentro === 'true' ? 'El centro investigativo es requerido' : false })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Escriba el nombre del centro"
            />
            {errors.centroInvestigativo && <span className="text-red-500 text-xs mt-1 block">{errors.centroInvestigativo.message}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2;
