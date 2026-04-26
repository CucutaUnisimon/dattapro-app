import techImg from '../assets/convocatorias/tech.png';
import scienceImg from '../assets/convocatorias/science.png';
import spaceImg from '../assets/convocatorias/space.png';

const Convocatorias = () => {
    const filterOptions = [
        { label: 'Áreas de Conocimiento', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { label: 'Financiación', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.73 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.73-1M12 16v-1m4-4V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
        { label: 'Fecha Límite', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z' }
    ];

    const convocatorias = [
        {
            id: 1,
            title: "Convocatoria Nacional de Innovación 2024 - Energías Limpias",
            match: 85,
            agency: "MINCIENCIAS",
            image: techImg,
            tags: ["ENERGÍAS RENOVABLES", "IA & ML"],
            sector: "Tecnología",
            languages: ["Español", "Inglés"],
            deadline: "Oct 15, 2024",
            funding: "$200M COP",
            visible: true
        },
        {
            id: 2,
            title: "Beca de Investigación Postdoctoral en Biotecnología Avanzada",
            match: 92,
            agency: "ERASMUS+",
            image: scienceImg,
            tags: ["BIOTECNOLOGÍA", "SALUD HUMANA"],
            sector: "Academia",
            languages: ["Inglés C1"],
            deadline: "Nov 30, 2024",
            funding: "Total Cover",
            visible: true
        },
        {
            id: 3,
            title: "Desafío Global de Datos Espaciales para la Sostenibilidad",
            match: 78,
            agency: "NASA SPACE APPS",
            image: spaceImg,
            tags: ["BIG DATA", "SOSTENIBILIDAD"],
            sector: "Gubernamental",
            languages: ["Inglés", "Español"],
            deadline: "Ene 12, 2025",
            funding: "$50,000 USD",
            visible: true
        }
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Convocatorias Abiertas</h1>
                <p className="text-lg font-medium text-slate-500 leading-relaxed max-w-2xl">
                    Descubre y aplica a las mejores oportunidades de financiación e innovación académica.
                </p>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    {filterOptions.map((opt, i) => (
                        <button 
                            key={i}
                            className="flex items-center gap-2.5 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={opt.icon} />
                            </svg>
                            {opt.label}
                            <svg className="w-4 h-4 ml-1 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-400 font-medium">Ordenar por:</span>
                    <button className="flex items-center gap-2 font-bold text-slate-900 hover:text-primary transition-colors">
                        Más Relevantes
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {convocatorias.map((item) => (
                    <div 
                        key={item.id} 
                        className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full"
                    >
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden">
                            <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <div className="backdrop-blur-md bg-sky-500/80 text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1.5 shadow-lg">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    {item.match}% MATCH
                                </div>
                                <div className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-lg">
                                    {item.agency}
                                </div>
                            </div>

                            <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-lg active:scale-90">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                                {item.title}
                            </h3>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {item.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span>Sector</span>
                                    </div>
                                    <span className="font-bold text-slate-700">{item.sector}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                        </div>
                                        <span>Idiomas</span>
                                    </div>
                                    <span className="font-bold text-slate-700 truncate max-w-[120px]">{item.languages.join(', ')}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span>Fecha Límite</span>
                                    </div>
                                    <span className="font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">{item.deadline}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2.5 text-slate-400 font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.73 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.73-1M12 16v-1m-7-3h14" />
                                            </svg>
                                        </div>
                                        <span>Financiación</span>
                                    </div>
                                    <span className="font-bold text-emerald-600">{item.funding}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto flex items-center gap-3">
                                <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl shadow-slate-200 hover:shadow-primary/40 active:scale-95">
                                    Ver Detalles
                                </button>
                                <button className="w-14 h-14 bg-orange-50 flex items-center justify-center rounded-2xl text-orange-600 hover:bg-orange-600 hover:text-white transition-all active:scale-90 border border-orange-100">
                                    <svg className="w-6 h-6 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Float Action Button (as in screenshot "Nueva Búsqueda") */}
            <div className="fixed bottom-10 left-12 z-50">
                <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-black text-sm tracking-widest uppercase shadow-2xl shadow-primary/40 group hover:scale-105 transition-all active:scale-95">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    Nueva Búsqueda
                </button>
            </div>
        </div>
    );
};

export default Convocatorias;
