import React, { useState, useRef } from 'react';
import { 
  X, 
  User, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Save, 
  Check, 
  Sparkles, 
  Upload, 
  FileText, 
  Trash2, 
  RotateCcw, 
  Info, 
  Link as LinkIcon,
  CheckCircle2
} from 'lucide-react';

export const EMPTY_PROFILE = {
  name: "",
  roleTitle: "",
  techStack: "",
  experienceYears: "3",
  hasDegree: false,
  originCountry: "",
  preferredDestinations: "España, Alemania, Países Bajos",
  linkedinUrl: "",
  githubUrl: "",
  cvFileName: "",
  cvFileSize: "",
  cvUploadedAt: ""
};

export const DEFAULT_DEMO_PROFILE = {
  name: "Candidato Ejemplo",
  roleTitle: "Full Stack Engineer (.NET & React)",
  techStack: "C#, .NET Core, SQL Server, React, TypeScript",
  experienceYears: "3",
  hasDegree: false,
  originCountry: "Argentina",
  preferredDestinations: "España, Alemania, Países Bajos",
  linkedinUrl: "https://linkedin.com/in/tu-perfil",
  githubUrl: "https://github.com/tu-usuario",
  cvFileName: "",
  cvFileSize: "",
  cvUploadedAt: ""
};

export function ProfileModal({ isOpen, onClose, profile, onSave }) {
  const [activeMethod, setActiveMethod] = useState('all'); // 'all', 'cv', 'linkedin', 'manual'
  const [formData, setFormData] = useState(profile || DEFAULT_DEMO_PROFILE);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Manejador de subida de archivo CV
  const handleFileUpload = (file) => {
    if (!file) return;
    const fileSizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    setFormData(prev => ({
      ...prev,
      cvFileName: file.name,
      cvFileSize: fileSizeFormatted,
      cvUploadedAt: new Date().toLocaleDateString(),
      // Si el nombre aún está vacío, deducir algo amistoso del archivo
      name: prev.name || file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ")
    }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveCv = () => {
    setFormData(prev => ({
      ...prev,
      cvFileName: "",
      cvFileSize: "",
      cvUploadedAt: ""
    }));
  };

  const handleResetToEmpty = () => {
    if (window.confirm("¿Deseas limpiar todos los campos para cargar tu perfil desde cero?")) {
      setFormData(EMPTY_PROFILE);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="glass-panel border border-dark-700 bg-dark-900/95 w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-100 flex items-center gap-2">
                Carga de Perfil & CV Personal
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Carga tu CV, vincula tu LinkedIn o ingresa tus datos manualmente.
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

        {/* Barra de opciones rápidas: CV / LinkedIn / Manual */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-dark-950/80 border border-dark-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveMethod('cv')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeMethod === 'cv' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/50'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>1. Cargar CV</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMethod('linkedin')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeMethod === 'linkedin' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/50'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-sky-300" />
            <span>2. LinkedIn URL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMethod('manual')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeMethod === 'manual' || activeMethod === 'all'
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/50'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>3. Datos & Título</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* SECCIÓN 1: Carga de Archivo CV */}
          {(activeMethod === 'cv' || activeMethod === 'all') && (
            <div className="space-y-3 p-4 bg-dark-950/50 border border-dark-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Adjuntar Hoja de Vida / Currículum (PDF / DOCX)
                </label>
                {formData.cvFileName && (
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> CV Cargado
                  </span>
                )}
              </div>

              {formData.cvFileName ? (
                <div className="flex items-center justify-between p-3 bg-dark-900 border border-emerald-500/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 truncate max-w-xs md:max-w-md">
                        {formData.cvFileName}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {formData.cvFileSize} • Subido el {formData.cvUploadedAt || 'hoy'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1.5 text-xs bg-dark-800 hover:bg-dark-700 text-slate-300 rounded-lg transition-colors"
                    >
                      Reemplazar
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveCv}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                      title="Eliminar CV adjunto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    dragOver 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-dark-700 hover:border-blue-500/50 bg-dark-950/60'
                  }`}
                >
                  <Upload className="w-7 h-7 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-200">
                    Arrastra tu CV aquí o <span className="text-blue-400 underline">haz clic para seleccionarlo</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Formatos soportados: PDF, DOCX, TXT (hasta 10 MB).
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
            </div>
          )}

          {/* SECCIÓN 2: LinkedIn & Enlaces */}
          {(activeMethod === 'linkedin' || activeMethod === 'all') && (
            <div className="space-y-3 p-4 bg-dark-950/50 border border-dark-800 rounded-2xl">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-sky-400" />
                Vincular Enlace de LinkedIn & Redes
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-sky-400" />
                    URL de tu Perfil de LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/tu-usuario"
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    URL de tu GitHub o Portafolio (opcional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => handleChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/tu-usuario"
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 3: Datos Manuales & Titulación */}
          {(activeMethod === 'manual' || activeMethod === 'all') && (
            <div className="space-y-4 p-4 bg-dark-950/50 border border-dark-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  Datos Personales & Profesionales
                </label>
                <button
                  type="button"
                  onClick={handleResetToEmpty}
                  className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  title="Borrar todos los campos para cargar tu perfil limpio"
                >
                  <RotateCcw className="w-3 h-3" />
                  Limpiar formulario
                </button>
              </div>

              {/* Nombre y Título del Puesto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Tu Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Ej. Martín González"
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Rol o Título Profesional
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roleTitle}
                    onChange={(e) => handleChange('roleTitle', e.target.value)}
                    placeholder="Ej. Full Stack Engineer / Frontend / Backend"
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* Stack & Años */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Stack Tecnológico Principal
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => handleChange('techStack', e.target.value)}
                    placeholder="Ej. React, Node.js, Python, TypeScript, .NET"
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Años de Experiencia
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="35"
                    value={formData.experienceYears}
                    onChange={(e) => handleChange('experienceYears', e.target.value)}
                    placeholder="3"
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* País y Destinos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    País de Origen / Residencia
                  </label>
                  <input
                    type="text"
                    value={formData.originCountry}
                    onChange={(e) => handleChange('originCountry', e.target.value)}
                    placeholder="Ej. Argentina, Colombia, México..."
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Países de Destino en Europa
                  </label>
                  <input
                    type="text"
                    value={formData.preferredDestinations}
                    onChange={(e) => handleChange('preferredDestinations', e.target.value)}
                    placeholder="España, Alemania, Países Bajos"
                    className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </div>

              {/* SELECTOR DE TÍTULO UNIVERSITARIO SÍ / NO */}
              <div className="space-y-2 pt-2 border-t border-dark-800/80">
                <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  ¿Cuentas con Título Universitario Homologable?
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleChange('hasDegree', false)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      !formData.hasDegree
                        ? 'bg-blue-600/15 border-blue-500/50 text-blue-300 shadow-md shadow-blue-500/5'
                        : 'bg-dark-950/60 border-dark-800 text-slate-400 hover:bg-dark-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">💼 Sin Título Universitario</span>
                      {!formData.hasDegree && <Check className="w-3.5 h-3.5 text-blue-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 leading-snug">
                      Vía de experiencia profesional IT demostrable (+3 años) para visados y Tarjeta Azul.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange('hasDegree', true)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      formData.hasDegree
                        ? 'bg-emerald-600/15 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/5'
                        : 'bg-dark-950/60 border-dark-800 text-slate-400 hover:bg-dark-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">🎓 Con Título Universitario</span>
                      {formData.hasDegree && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 leading-snug">
                      Grado universitario o ingeniería informática para tramitación directa.
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer del Modal */}
          <div className="flex items-center justify-between pt-4 border-t border-dark-800">
            <span className="text-[10px] text-slate-500">
              * Los datos se guardan en tu navegador local de forma privada.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    ¡Guardado!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Guardar Perfil
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
