import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck,
  RefreshCw,
  SlidersHorizontal,
  DollarSign,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { fetchJobs } from '../services/api';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [savedJobIds, setSavedJobIds] = useState([]);

  const countries = [
    { code: 'All', name: 'Toda la UE' },
    { code: 'Spain', name: 'España' },
    { code: 'Germany', name: 'Alemania' },
    { code: 'Netherlands', name: 'Países Bajos' }
  ];

  const technologies = [
    'All', '.NET', 'C#', 'React', 'Angular', 'SQL Server'
  ];

  // Cargar ofertas
  const loadJobsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchParam = selectedTech === 'All' ? '' : selectedTech;
      const locationParam = selectedCountry === 'All' ? '' : selectedCountry;
      const data = await fetchJobs(searchParam, locationParam);
      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("No pudimos obtener las ofertas en este momento. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobsData();
  }, [selectedCountry, selectedTech]);

  // Cargar IDs de empleos guardados en localStorage al iniciar
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tracked_jobs') || '[]');
    setSavedJobIds(saved.map(j => j.id));
  }, []);

  // Función para guardar/quitar del Job Tracker
  const toggleSaveJob = (job) => {
    const saved = JSON.parse(localStorage.getItem('tracked_jobs') || '[]');
    const isAlreadySaved = saved.some(j => j.id === job.id);
    
    let updated;
    if (isAlreadySaved) {
      updated = saved.filter(j => j.id !== job.id);
      setSavedJobIds(savedJobIds.filter(id => id !== job.id));
    } else {
      const newJobTrack = {
        ...job,
        status: 'Pendiente',
        appliedDate: '',
        notes: '',
        savedAt: new Date().toISOString()
      };
      updated = [...saved, newJobTrack];
      setSavedJobIds([...savedJobIds, job.id]);
    }
    
    localStorage.setItem('tracked_jobs', JSON.stringify(updated));
  };

  // Filtrado de lado cliente para la barra de búsqueda de texto libre
  const filteredJobs = jobs.filter(job => {
    const textMatches = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return textMatches;
  });

  return (
    <div className="flex-1 flex flex-col space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 flex items-center gap-2">
            Oportunidades con Visa Sponsorship
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse">
              En Vivo
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explora ofertas filtradas y validadas con patrocinio de visa para perfiles de software en la Unión Europea.
          </p>
        </div>
        <button 
          onClick={loadJobsData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-dark-900 hover:bg-dark-800 border border-dark-800 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-all self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Recargar ofertas
        </button>
      </div>

      {/* Control Panel (Busqueda y Filtros) */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Barra de búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar puesto, empresa o palabra clave (ej. React, .NET, Node, Java)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-950/80 border border-dark-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Filtros rápidos */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Filtro País */}
            <div className="flex items-center gap-1.5 bg-dark-950/60 border border-dark-800 rounded-xl px-3 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-300 focus:outline-none cursor-pointer pr-1"
              >
                {countries.map(c => (
                  <option key={c.code} value={c.code} className="bg-dark-900 text-slate-300">{c.name}</option>
                ))}
              </select>
            </div>

            {/* Filtro Tecnología */}
            <div className="flex items-center gap-1.5 bg-dark-950/60 border border-dark-800 rounded-xl px-3 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-300 focus:outline-none cursor-pointer pr-1"
              >
                {technologies.map(t => (
                  <option key={t} value={t} className="bg-dark-900 text-slate-300">{t === 'All' ? 'Tecnologías' : t}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Tags de Tecnologías rápidos */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-dark-800/50">
          <span className="text-xs text-slate-500 mr-2">Filtro rápido:</span>
          {technologies.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTech(t)}
              className={`
                px-2.5 py-1 rounded-lg text-xs font-medium transition-all
                ${selectedTech === t 
                  ? 'bg-blue-600/25 text-blue-300 border border-blue-500/30' 
                  : 'bg-dark-950/40 text-slate-400 hover:text-slate-200 border border-dark-800/80'
                }
              `}
            >
              {t === 'All' ? 'Todas' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados / Listado */}
      {error && (
        <div className="glass-panel border-red-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p className="text-slate-300 font-medium">{error}</p>
          <button 
            onClick={loadJobsData}
            className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/25 transition-all"
          >
            Reintentar
          </button>
        </div>
      )}

      {!error && loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="glass-panel rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-dark-800 rounded w-2/3"></div>
                  <div className="h-4 bg-dark-800 rounded w-1/3"></div>
                </div>
                <div className="w-8 h-8 bg-dark-800 rounded-lg"></div>
              </div>
              <div className="h-16 bg-dark-800 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-dark-800 rounded w-16"></div>
                <div className="h-6 bg-dark-800 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && !loading && filteredJobs.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-3">
          <Briefcase className="w-12 h-12 text-slate-600" />
          <h3 className="font-display font-bold text-lg text-slate-300">No encontramos ofertas</h3>
          <p className="text-sm text-slate-500 max-w-md">
            No se encontraron ofertas que coincidan exactamente con la búsqueda "{searchTerm}". Prueba relajando algunos filtros.
          </p>
        </div>
      )}

      {!error && !loading && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredJobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
            return (
              <div 
                key={job.id} 
                className="glass-panel glass-panel-hover rounded-2xl p-5 md:p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Fila superior (Empresa, Ubicación y Guardar) */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/15 mb-2">
                        <MapPin className="w-2.5 h-2.5" />
                        {job.location}
                      </span>
                      <h2 className="font-display font-bold text-lg text-slate-100 leading-snug group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                        <span>{job.company}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{job.postedAt}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job)}
                      className={`
                        p-2.5 rounded-xl border shrink-0 transition-all duration-200
                        ${isSaved 
                          ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20' 
                          : 'bg-dark-950/60 border-dark-800 text-slate-400 hover:text-slate-200 hover:bg-dark-800'
                        }
                      `}
                      title={isSaved ? "Quitar del Tracker" : "Guardar en Tracker"}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Descripción recortada */}
                  <p className="text-xs text-slate-400 mt-4 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Fila inferior (Tags de Beneficios, Tecnologías y Link) */}
                <div className="space-y-3 pt-3 border-t border-dark-800/60">
                  
                  {/* Beneficios de Visa y Relocalización */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.benefits.map((benefit, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {benefit}
                      </span>
                    ))}
                    {job.salary && job.salary !== "Salario no especificado" && (
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-0.5">
                        <DollarSign className="w-2.5 h-2.5" />
                        {job.salary}
                      </span>
                    )}
                  </div>

                  {/* Tecnologías y botón de aplicar */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-dark-950/80 border border-dark-800/80 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-500/10 transition-colors shrink-0"
                    >
                      Aplicar
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default Dashboard;
