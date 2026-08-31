import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Copy, 
  Check, 
  FolderTree, 
  Globe, 
  Key, 
  ExternalLink,
  Sparkles,
  Terminal,
  BookOpen
} from 'lucide-react';

export function DeveloperGuideModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const netlifyFunctionCode = `// Ubicación: netlify/functions/jobs.js
// 1. Agregar aquí tu nueva API o endpoint:
const fetchFromNewAPI = async (searchTerm, location) => {
  const url = \`https://api.ejemplo.com/jobs?query=\${searchTerm}&geo=\${location}\`;
  const data = await fetchJson(url, {
    headers: { 'Authorization': \`Bearer \${process.env.NUEVA_API_KEY}\` }
  });
  
  // Normalizar los campos al esquema unificado:
  return data.results.map(item => ({
    id: item.id,
    title: item.title,
    company: item.company_name,
    location: item.location,
    country: item.country || "EU",
    countryCode: item.country_code || "EU",
    description: item.snippet,
    url: item.apply_url,
    salary: item.salary || "Salario no especificado",
    postedAt: item.posted_date || "Reciente",
    tags: [item.tag1, item.tag2],
    benefits: ["Visa Sponsorship", "Relocation Package"]
  }));
};`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="glass-panel border border-dark-700 bg-dark-900/95 w-full max-w-3xl rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
                Guía para Desarrolladores & Nuevas APIs
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Open Source
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Cómo agregar nuevos proveedores de búsqueda y fuentes de empleo al proyecto.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido de la Guía */}
        <div className="space-y-6 text-xs text-slate-300 max-h-[65vh] overflow-y-auto pr-2">
          
          {/* Carpeta y Arquitectura */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-blue-400" />
              1. ¿Dónde se configuran las APIs en el proyecto?
            </h3>
            <div className="bg-dark-950/80 border border-dark-800 rounded-xl p-4 space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-bold">📂 netlify/functions/jobs.js</span>
                <span className="text-slate-500 text-[10px]">Backend Serverless (CORS seguro)</span>
              </div>
              <p className="text-slate-400 text-xs font-sans">
                Es el orquestador principal. Aquí se consultan las APIs externas de forma segura (sin exponer API Keys en el cliente). Recibe las peticiones desde el frontend y unifica el formato JSON.
              </p>
              <div className="pt-2 border-t border-dark-800/80 flex items-center justify-between">
                <span className="text-emerald-400 font-bold">📂 src/services/api.js</span>
                <span className="text-slate-500 text-[10px]">Cliente Frontend & Fallback Offline</span>
              </div>
              <p className="text-slate-400 text-xs font-sans">
                Realiza la llamada <code className="text-blue-300">fetch('/api/jobs')</code> y contiene el fallback local para pruebas offline o desarrollo sin conexión a Netlify.
              </p>
            </div>
          </div>

          {/* Variables de Entorno */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              2. Variables de Entorno (API Keys)
            </h3>
            <div className="bg-dark-950/60 border border-dark-800 rounded-xl p-4 space-y-2 leading-relaxed">
              <p>
                Para configurar claves privadas en Netlify o en desarrollo local:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong>En Netlify:</strong> Ve a <i>Site configuration &gt; Environment variables</i> y agrega tu clave (ej. <code className="text-amber-300 font-mono">RAPIDAPI_KEY</code>, <code className="text-amber-300 font-mono">ADZUNA_APP_KEY</code>, etc.).</li>
                <li><strong>En Local:</strong> Crea un archivo <code className="text-blue-300 font-mono">.env</code> en la raíz de <code className="text-slate-200 font-mono">job-hunter-app</code> para correr con Netlify CLI.</li>
              </ul>
            </div>
          </div>

          {/* Código de Ejemplo para colaborar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                3. Esquema Estándar de Respuesta (JSON)
              </h3>
              <button
                onClick={() => copyToClipboard(netlifyFunctionCode, 'code')}
                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20 transition-all"
              >
                {copiedKey === 'code' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copiar código base
                  </>
                )}
              </button>
            </div>
            
            <pre className="bg-dark-950 border border-dark-800 rounded-xl p-3.5 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
              {netlifyFunctionCode}
            </pre>
          </div>

          {/* Sugerencias de APIs Gratuitas o Populares */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              4. APIs Recomendadas para Integrar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-dark-950/60 border border-dark-800 rounded-xl space-y-1">
                <span className="font-bold text-slate-200">RapidAPI JSearch / LinkedIn Jobs</span>
                <p className="text-[11px] text-slate-400">Búsqueda masiva en Google Jobs, LinkedIn e Indeed con filtros de visa.</p>
              </div>
              <div className="p-3 bg-dark-950/60 border border-dark-800 rounded-xl space-y-1">
                <span className="font-bold text-slate-200">Remotive API (Gratuita)</span>
                <p className="text-[11px] text-slate-400">Empleos remotos y con relocalización en Europa e internacional.</p>
              </div>
              <div className="p-3 bg-dark-950/60 border border-dark-800 rounded-xl space-y-1">
                <span className="font-bold text-slate-200">Adzuna API</span>
                <p className="text-[11px] text-slate-400">API gratuita para ofertas de trabajo en España, Alemania, Holanda y UK.</p>
              </div>
              <div className="p-3 bg-dark-950/60 border border-dark-800 rounded-xl space-y-1">
                <span className="font-bold text-slate-200">Arbeitnow / Jooble</span>
                <p className="text-[11px] text-slate-400">Excelente para empleos con patrocinio de visa en Alemania y Europa Central.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-800">
          <span className="text-[11px] text-slate-500 font-mono">
            ¡Pull Requests & Sugerencias son bienvenidas!
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
          >
            Cerrar Guía
          </button>
        </div>

      </div>
    </div>
  );
}
