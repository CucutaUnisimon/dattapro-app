import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminUsers = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [updatingId, setUpdatingId] = useState(null); // Para mostrar carga en el select

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/admin/usuarios');
            if (!response.ok) {
                throw new Error('Error al obtener la lista de usuarios');
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const filteredUsuarios = usuarios.filter((usuario) => {
        const fullName = `${usuario.nombres} ${usuario.apellidos}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) ||
            (usuario.correoInstitucional && usuario.correoInstitucional.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const handleRoleChange = async (usuario, nuevoRol) => {
        if (usuario.rol === nuevoRol) return;
        
        const userId = usuario.id; 
        
        if (!userId) {
            alert("El usuario no tiene un ID válido para actualizar.");
            return;
        }

        setUpdatingId(userId);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    correoInstitucional: usuario.correoInstitucional,
                    rol: nuevoRol
                })
            });

            if (!response.ok) {
                throw new Error('No se pudo actualizar el rol');
            }

            // Actualizar el estado localmente si fue exitoso
            setUsuarios(prevUsuarios => 
                prevUsuarios.map(u => u.id === userId ? { ...u, rol: nuevoRol } : u)
            );
            
            
            alert("Rol actualizado exitosamente");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el rol: " + error.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/usuarios/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el usuario');
            }

            setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.id !== id));
            alert('Usuario eliminado exitosamente');
        } catch (error) {
            console.error(error);
            alert("Error al eliminar el usuario: " + error.message);
        }
    };

    return (
        <div className="flex-1 bg-slate-50 dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100">
            {/* Contenido Principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Header Section */}
                    <div className="mb-8 md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-black leading-7 text-slate-900 dark:text-white sm:text-3xl sm:truncate">
                                Gestión de Usuarios
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Administra los perfiles y actualiza los roles (admin, profesor, lider).
                            </p>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <div className="relative rounded-xl shadow-sm max-w-md w-full md:w-80">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl py-2.5 transition-colors outline-none"
                                    placeholder="Buscar usuario..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
                            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-red-800 dark:text-red-300">Hubo un problema</h3>
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    ) : filteredUsuarios.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800">
                            <svg className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <h3 className="mt-4 text-sm font-medium text-slate-900 dark:text-slate-100">No hay usuarios registrados</h3>
                            <p className="mt-1 text-sm text-slate-500">Intenta buscar con otros términos.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredUsuarios.map((usuario) => (
                                <div key={usuario.id || usuario.correoInstitucional} className="bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                                    <div className="p-6 flex-1">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {/* Imagen o Iniciales */}
                                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold font-display shadow-inner overflow-hidden">
                                                    {usuario.foto ? (
                                                        <img
                                                            src={`data:image/jpeg;base64,${usuario.foto}`}
                                                            alt="Foto de perfil"
                                                            className="h-full w-full object-cover rounded-full"
                                                        />
                                                    ) : (
                                                        <span>{usuario.nombres?.charAt(0)}{usuario.apellidos?.charAt(0)}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-bold text-slate-900 dark:text-white truncate">
                                                    {usuario.nombres} {usuario.apellidos}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                        usuario.rol === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                        usuario.rol === 'lider' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                                                        'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400'
                                                    }`}>
                                                        {usuario.rol || 'No asignado'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                                                <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="truncate">{usuario.correoInstitucional}</span>
                                            </div>
                                            {/* ID para facilitar administración */}
                                            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 mt-2 font-mono">
                                                ID: {usuario.id || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Footer: Acciones admin */}
                                    <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label htmlFor={`rol-${usuario.id}`} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Asignar Rol
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id={`rol-${usuario.id}`}
                                                    value={usuario.rol || 'profesor'}
                                                    disabled={updatingId === usuario.id}
                                                    onChange={(e) => handleRoleChange(usuario, e.target.value)}
                                                    className="block w-full pl-3 pr-10 py-2 text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                                                >
                                                    <option value="profesor">Profesor</option>
                                                    <option value="lider">Líder</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                                    {updatingId === usuario.id ? (
                                                        <div className="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full"></div>
                                                    ) : (
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteUser(usuario.id)}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-lg transition-colors border border-red-100 dark:border-red-900/40"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Eliminar Usuario
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default AdminUsers;
