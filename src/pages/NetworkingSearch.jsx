import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NetworkingSearch = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                // Adjust the endpoint if necessary. Assuming GET /api/v1/usuarios returns the list.
                const response = await fetch('http://localhost:8080/api/v1/usuarios');
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

        fetchUsuarios();
    }, []);

    const filteredUsuarios = usuarios.filter((usuario) => {
        const fullName = `${usuario.nombres} ${usuario.apellidos}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) ||
            (usuario.correoInstitucional && usuario.correoInstitucional.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col flex-shrink-0 z-20">
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

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {/* Inicio (Not active) */}
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary dark:hover:text-primary rounded-xl transition-colors font-medium">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span>Inicio</span>
                    </Link>

                    {/* Networking (Active) */}
                    <Link to="/network" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary dark:text-primary rounded-xl transition-colors font-bold">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span>Networking</span>
                    </Link>

                    {/* Convocatorias (Not active) */}
                    <Link to="/convocatorias" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary dark:hover:text-primary rounded-xl transition-colors font-medium">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14z"/>
                        </svg>
                        <span>Convocatorias</span>
                    </Link>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span>Cerrar sesión</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full relative">
                {/* Mobile Header (Only visible on small screens) */}
                <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-gradient-to-br from-primary to-cyan-500 rounded-lg flex items-center justify-center text-white shadow-md">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                            </svg>
                        </div>
                        <span className="font-bold tracking-tight">dattapro</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Header Section */}
                <div className="mb-8 md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-black leading-7 text-slate-900 dark:text-white sm:text-3xl sm:truncate">
                            Directorio de Profesores
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Encuentra y conecta con investigadores y profesores de la red.
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
                                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl py-2.5 transition-colors outline-none"
                                placeholder="Buscar por nombre o correo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="mt-4 text-sm font-medium text-slate-900 dark:text-slate-100">No se encontraron profesores</h3>
                        <p className="mt-1 text-sm text-slate-500">Intenta buscar con otros términos.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredUsuarios.map((usuario) => (
                            <div key={usuario.id || usuario.correoInstitucional} className="bg-white dark:bg-slate-950 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            {/* LÓGICA DE IMAGEN O INICIALES */}
                                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold font-display shadow-inner overflow-hidden">
                                                {usuario.foto ? (
                                                    <img
                                                        /* El backend ahora envía bytes que llegan como Base64 en el JSON */
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
                                            <p className="text-sm font-medium text-primary truncate">
                                                Profesor / Investigador
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                                            <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="truncate">{usuario.correoInstitucional}</span>
                                        </div>
                                        {/* You can add more attributes here like department if backend provides it */}
                                    </div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                                    <button className="text-sm font-semibold text-primary hover:text-indigo-600 transition-colors w-full">
                                        Ver Perfil Completo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </main>
        </div>
    );
};

export default NetworkingSearch;
