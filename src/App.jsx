import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  KanbanSquare, 
  FileText, 
  Globe, 
  User, 
  Zap, 
  MapPin, 
  Award,
  ChevronRight,
  Menu,
  X,
  Edit3,
  GraduationCap,
  Linkedin,
  Github,
  Code2,
  HelpCircle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Tracker from './components/Tracker';
import CoverLetter from './components/CoverLetter';
import { ProfileModal, DEFAULT_PROFILE } from './components/ProfileModal';
import { DeveloperGuideModal } from './components/DeveloperGuideModal';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDevGuideOpen, setIsDevGuideOpen] = useState(false);

  // Perfil del usuario persistido en localStorage para que cualquier visitante lo use
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('candidate_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  });

  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('candidate_profile', JSON.stringify(newProfile));
  };

  const navItems = [
    { id: 'dashboard', label: 'Búsquedas Diarias', icon: Briefcase },
    { id: 'tracker', label: 'Seguimiento (Job Tracker)', icon: KanbanSquare },
    { id: 'coverletter', label: 'Generador de Cover Letter', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col md:flex-row relative">
      
      {/* Glow backgrounds de fondo para estética premium */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[100px] animate-pulse-glow pointer-events-none"></div>

      {/* Mobile Top Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 bg-dark-900 border-b border-dark-800 z-50">
        <div className="flex items-center gap-2">
          <Zap className="text-blue-500 w-6 h-6" />
          <span className="font-display font-bold text-lg tracking-wider bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">JOB HUNTER EU</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="p-1.5 bg-dark-800 hover:bg-dark-700 text-blue-400 rounded-lg text-xs font-semibold flex items-center gap-1"
            title="Mi Perfil"
          >
            <User className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-400 hover:text-white p-1"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-dark-900/90 md:bg-dark-900 border-r border-dark-800 p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Logo */}
          <div className="hidden md:flex items-center gap-2.5 mb-6">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              JOB HUNTER EU
            </span>
          </div>

          {/* User Profile Card (Dینámico & Editable) */}
          <div className="bg-dark-950/70 border border-dark-800 rounded-2xl p-4 mb-5 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-blue-600/10 rounded-full blur-xl"></div>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                <span>Perfil</span>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-400 bg-dark-900 hover:bg-dark-800 px-2 py-1 rounded-lg border border-dark-800/80 transition-colors"
                title="Editar mi perfil y configuración"
              >
                <Edit3 className="w-3 h-3" />
                Editar
              </button>
            </div>

            <h3 className="font-display font-bold text-sm text-slate-100 mb-0.5 leading-tight truncate">
              {profile.name || "Candidato"}
            </h3>
            <p className="text-xs text-slate-400 mb-2 truncate">
              {profile.roleTitle || profile.techStack}
            </p>

            {/* Degree status badge */}
            <div className="mb-2.5">
              {profile.hasDegree ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  <GraduationCap className="w-3 h-3" />
                  Con Título Universitario
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  <Award className="w-3 h-3" />
                  Experiencia IT (+{profile.experienceYears || '3'} años)
                </span>
              )}
            </div>
            
            <div className="flex flex-col gap-1.5 pt-2.5 border-t border-dark-800/80 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">Meta: {profile.preferredDestinations || "UE"}</span>
              </div>
              
              {/* Enlaces a LinkedIn y GitHub */}
              <div className="flex items-center gap-2 pt-1">
                {profile.linkedinUrl && (
                  <a 
                    href={profile.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <Linkedin className="w-3 h-3" />
                    LinkedIn
                  </a>
                )}
                {profile.githubUrl && (
                  <a 
                    href={profile.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Menú Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-dark-800/60'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0.5 opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar con botón de Colaboración / Developer Guide */}
        <div className="pt-4 border-t border-dark-800 space-y-2 text-center">
          <button
            onClick={() => setIsDevGuideOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-dark-950/80 hover:bg-dark-800 border border-dark-800 rounded-xl text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-all shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Colaborar & Nuevas APIs</span>
          </button>

          <div className="text-[10px] text-slate-500 font-mono">
            V1.1.0 • Netlify Ready
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 flex flex-col overflow-y-auto max-h-screen">
        
        {/* Renderizado condicional de componentes */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'tracker' && <Tracker />}
          {activeTab === 'coverletter' && (
            <CoverLetter 
              profile={profile} 
              onOpenProfileModal={() => setIsProfileModalOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Modales */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <DeveloperGuideModal
        isOpen={isDevGuideOpen}
        onClose={() => setIsDevGuideOpen(false)}
      />

    </div>
  );
}

export default App;
