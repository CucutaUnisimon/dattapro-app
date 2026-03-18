import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
    // Extraemos el mensaje del estado de la navegación (viene desde Register)
    const location = useLocation();
    const successMsg = location.state?.message;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <div className="flex min-h-screen">
                {/* Left Section: Login Form */}
                <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-24 bg-white dark:bg-background-dark">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="size-8 bg-[#4b5e26] rounded-md flex items-center justify-center p-1.5">
                                <svg viewBox="0 0 24 24" fill="none" className="text-white w-full h-full" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">dattapro-app</h2>
                        </div>

                        {/* MENSAJE DE ÉXITO DINÁMICO */}
                        {successMsg && (
                            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                    {successMsg}
                                </div>
                            </div>
                        )}

                        <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                            Welcome back
                        </h1>
                        <p className="text-base text-slate-500 dark:text-slate-400">
                            Connect with researchers worldwide and accelerate your discoveries.
                        </p>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                        <form action="#" className="space-y-6" method="POST" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100" htmlFor="email">
                                    Dirección de correo electrónico
                                </label>
                                <div className="mt-2">
                                    <input
                                        autoComplete="email"
                                        className="block w-full rounded-2xl border border-slate-200 py-4 px-4 text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none sm:text-sm bg-white dark:bg-slate-800 transition-all"
                                        id="email"
                                        name="email"
                                        placeholder="name@institution.edu"
                                        required
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100" htmlFor="password">
                                        Contraseña
                                    </label>
                                    <div className="text-sm">
                                        <a className="font-semibold text-primary hover:opacity-80 transition-opacity" href="#">
                                            ¿Olvidó su contraseña?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2 relative">
                                    <input
                                        autoComplete="current-password"
                                        className="block w-full rounded-2xl border border-slate-200 py-4 px-4 text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none sm:text-sm bg-white dark:bg-slate-800 transition-all"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        type="password"
                                    />
                                    <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors" type="button">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    className="h-5 w-5 rounded-full border-slate-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                />
                                {/* <label className="ml-3 block text-sm leading-6 text-slate-500 dark:text-slate-400 cursor-pointer" htmlFor="remember-me">
                                    Keep me logged in
                                </label> */}
                            </div>

                            <div>
                                <button
                                    className="flex w-full justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-4 text-sm font-bold leading-6 text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                                    type="submit"
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-slate-500">
                            ¿Aún no estas registrado?{' '}
                            <Link
                                to="/register"
                                className="font-semibold leading-6 text-primary hover:opacity-80 transition-opacity"
                            >
                                Crea tu cuenta
                            </Link>
                        </p>
                    </div>

                    <div className="mt-auto pt-10 text-center text-xs text-slate-400">
                        © 2024 dattapro Inc. Secure, encrypted research collaboration.
                    </div>
                </div>

                {/* Right Section: Visual Illustration */}
                <div className="relative hidden w-0 flex-1 lg:block p-8">
                    <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img
                            alt="Researcher working in a modern high-tech laboratory"
                            className="absolute inset-0 h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=1974&auto=format&fit=crop"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                        <div className="absolute bottom-12 left-12 right-12">
                            <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-10 border border-white/20 shadow-2xl">
                                <div className="flex gap-2 mb-6 text-primary">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 14v1c0 1.1.9 2 2 2v2.93zM18 17c-.11-.34-.11-.66 0-1 1.05-3.08 1-6 .11-8.91C17.15 4.54 14.82 3 12 3c-1.03 0-2 .16-2.91.46C7.38 4.38 5 6.9 4 10c-.11.34-.11.66 0 1 .11 1.76.11 3.24 0 5 .11.34.11.66 0 1 .49 1.5 1.5 2.5 3 3 .34.11.66.11 1 0 1.76-.11 3.24-.11 5 0 .34.11.66.11 1 0 1.5-.49 2.5-1.5 3-3z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">Connecting Minds, Accelerating Science</h3>
                                <p className="text-white/80 text-lg leading-relaxed mb-8">
                                    Join over 50,000 PhDs and researchers matching for cross-disciplinary projects every day.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[
                                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
                                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
                                            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
                                        ].map((src, i) => (
                                            <div
                                                key={i}
                                                className="size-12 rounded-full border-2 border-slate-900/20 bg-slate-100 overflow-hidden"
                                            >
                                                <img alt="avatar" className="w-full h-full object-cover" src={src} />
                                            </div>
                                        ))}
                                        <div className="flex size-12 items-center justify-center rounded-full border-2 border-white/20 bg-primary text-xs font-bold text-white shadow-lg">
                                            +12k
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;