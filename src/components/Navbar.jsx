import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { logout, role, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
            {/* Logo y Marca */}
            <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-4">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black tracking-tight text-slate-900">dattapro</span>
                </Link>
            </div>


            {/* Acciones de Usuario */}
            <div className="flex items-center space-x-6">
                <div className="hidden md:flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-[150px]">
                        {user?.email || 'Usuario'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                        {role || 'Investigador'}
                    </span>
                </div>

                <div className="h-10 w-10 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=ec5b13&color=fff`} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                    />
                </div>

                <button 
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Cerrar sesión"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
