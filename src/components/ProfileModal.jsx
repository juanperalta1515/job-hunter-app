import React, { useState } from 'react';
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
  Info
} from 'lucide-react';

export const DEFAULT_PROFILE = {
  name: "Desarrollador Full Stack",
  roleTitle: "Senior Full Stack Engineer (.NET & React)",
  techStack: ".NET, C#, SQL Server, React, Angular",
  experienceYears: "3",
  hasDegree: false,
  originCountry: "Argentina",
  preferredDestinations: "España, Alemania, Países Bajos",
  linkedinUrl: "https://linkedin.com/in/tu-perfil",
  githubUrl: "https://github.com/tu-usuario"
};

export function ProfileModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = useState(profile || DEFAULT_PROFILE);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="glass-panel border border-dark-700 bg-dark-900/95 w-full max-w-xl rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-100">
                Configuración de Perfil Candidato
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Personaliza tus datos para las postulaciones y cartas automáticas.
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nombre Completo & Título del Puesto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                Nombre Completo
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                Rol / Especialidad
              </label>
              <input
                type="text"
                required
                value={formData.roleTitle}
                onChange={(e) => handleChange('roleTitle', e.target.value)}
                placeholder="Ej. Full Stack .NET & React"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* Enlaces Sociales: LinkedIn y GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                URL de tu LinkedIn
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
                URL de tu GitHub (opcional)
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

          {/* Stack Tecnológico & Años de Experiencia */}
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
                placeholder="Ej. .NET, C#, React, SQL Server"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                Años de Experiencia
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={formData.experienceYears}
                onChange={(e) => handleChange('experienceYears', e.target.value)}
                placeholder="3"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* País Origen y Destinos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                País de Residencia Actual
              </label>
              <input
                type="text"
                value={formData.originCountry}
                onChange={(e) => handleChange('originCountry', e.target.value)}
                placeholder="Ej. Argentina"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                Destinos Objetivo en la UE
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

          {/* OPCIÓN CLAVE: Posee Título Universitario o No */}
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
                  Postulación respaldada por +3 años de experiencia IT demostrable (Directivas UE / PAC España).
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
                  Grado universitario o ingeniería completada (vía tradicional de Tarjeta Azul EU / Visado de Trabajo).
                </span>
              </button>
            </div>

            <div className="flex items-start gap-2 bg-blue-950/20 border border-blue-500/20 rounded-xl p-3 text-[11px] text-blue-300/90 leading-relaxed mt-2">
              <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
              <span>
                Esta elección ajustará automáticamente la argumentación legal y migratoria generada en tus cartas de presentación y mensajes de contacto para reclutadores.
              </span>
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-800">
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

        </form>

      </div>
    </div>
  );
}
