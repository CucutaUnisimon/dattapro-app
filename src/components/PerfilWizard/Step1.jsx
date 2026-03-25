import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step1 = () => {
  const { register, watch, formState: { errors } } = useFormContext();
  
  const deseaVincularse = watch('deseaVincularse');
  const autorizaDatos = watch('autorizaDatos');
  
  const canContinue = deseaVincularse === 'true' && autorizaDatos === 'true';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Paso 1: Consentimiento</h2>
      
      <div className="space-y-6 bg-white p-6 rounded-md shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">¿Desea vincularse a la Red Institucional de Investigadores?</label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="true" {...register('deseaVincularse', { required: 'Este campo es requerido' })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <span className="text-gray-700">Sí</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="false" {...register('deseaVincularse', { required: 'Este campo es requerido' })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <span className="text-gray-700">No</span>
            </label>
          </div>
          {errors.deseaVincularse && <span className="text-red-500 text-sm mt-1 block">{errors.deseaVincularse.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">¿Autoriza el tratamiento de sus datos personales?</label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="true" {...register('autorizaDatos', { required: 'Este campo es requerido' })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <span className="text-gray-700">Sí, autorizo</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="false" {...register('autorizaDatos', { required: 'Este campo es requerido' })} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
              <span className="text-gray-700">No autorizo</span>
            </label>
          </div>
          {errors.autorizaDatos && <span className="text-red-500 text-sm mt-1 block">{errors.autorizaDatos.message}</span>}
        </div>
      </div>

      {(!canContinue && (deseaVincularse === 'false' || autorizaDatos === 'false')) && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
          <p className="font-medium">Aviso</p>
          <p className="text-sm mt-1">Recuerde que debe aceptar vincularse y autorizar el tratamiento de datos para poder registrarse en la plataforma de manera correcta.</p>
        </div>
      )}
    </div>
  );
};

export default Step1;
