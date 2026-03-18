import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        nombres: '',      // Antes era nombre
        apellidos: '',    // Antes era apellido
        correoInstitucional: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/v1/usuarios/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 201) {
                // Registro exitoso
                navigate('/login', { state: { message: '¡Cuenta creada con éxito! Por favor, inicia sesión.' } });
            } else if (response.status === 409) {
                // Conflicto: correo ya existe
                setErrorMessage('El correo institucional ya está registrado.');
            } else {
                setErrorMessage('Error al registrar la cuenta. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            setErrorMessage('Error de conexión. Verifica que el servidor esté en ejecución.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex min-h-screen items-center justify-center p-6 sm:p-12">
                {/* Main Content Area */}
                <main className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-64 h-64">
                            <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                        </svg>
                    </div>

                    <div className="relative z-10 w-full">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3 mb-10">
                            <div className="size-10 bg-gradient-to-br from-primary to-orange-400 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20 p-2">
                                <svg viewBox="0 0 24 24" fill="none" className="text-white w-full h-full" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">dattapro-app</h2>
                        </div>

                        {/* Header */}
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">Create your account</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Start your journey into the global researcher network.</p>
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl border border-red-200 dark:border-red-800/50 mb-6 text-sm font-medium text-center">
                                {errorMessage}
                            </div>
                        )}

                        {/* Form Section */}
                        <div className="space-y-6">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                            placeholder="e.g. Marie"
                                            type="text"
                                            name="nombres"  // Antes era nombre
                                            value={formData.nombres}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                            placeholder="e.g. Curie"
                                            type="text"
                                            name="apellidos" // Antes era apellido
                                            value={formData.apellidos}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </div>
                                        <input
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                            placeholder="name@university.edu"
                                            type="email"
                                            name="correoInstitucional"
                                            value={formData.correoInstitucional}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </div>
                                        <input
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                            placeholder="Create a strong password"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 ml-1 mt-1">At least 8 characters, including numbers and symbols.</p>
                                </div>
                                <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <p className="text-sm text-slate-500 font-medium order-2 sm:order-1">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-primary font-bold hover:underline">Sign in</Link>
                                    </p>
                                    <button
                                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-bold py-4 px-10 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.98] order-1 sm:order-2"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Registering...' : 'Create Account'}
                                        {!isLoading && (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                <polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Helper Illustration / Visual */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    ),
                                    title: 'Secure Network',
                                    desc: 'Verified identity for all researchers.'
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    ),
                                    title: 'Collaboration',
                                    desc: 'Find partners easily.'
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="2" y1="12" x2="22" y2="12" />
                                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                    ),
                                    title: 'Global Reach',
                                    desc: 'Across 150+ countries.'
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 hover:border-primary/20 transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                    <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 shadow-inner">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-[11px] font-extrabold mb-1 text-slate-900 dark:text-white uppercase tracking-wider">{item.title}</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Register;
