import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Languages, 
  ChevronRight, 
  Sparkles,
  Info,
  Briefcase,
  Building,
  MapPin,
  MessageSquare,
  GraduationCap,
  Award,
  User,
  ExternalLink
} from 'lucide-react';

function CoverLetter({ profile, onOpenProfileModal }) {
  const [jobTitle, setJobTitle] = useState('Senior Full Stack Engineer (.NET & React)');
  const [company, setCompany] = useState('Booking.com');
  const [location, setLocation] = useState('Amsterdam, Netherlands');
  const [language, setLanguage] = useState('en'); // 'en' o 'es'
  const [templateType, setTemplateType] = useState('formal'); // 'formal' o 'cold-outreach'
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  // Lógica de generación dinámica de plantillas con datos del perfil del usuario
  const generateLetterText = () => {
    const isEn = language === 'en';
    const isFormal = templateType === 'formal';
    
    const candidateName = profile?.name || '[Your Name]';
    const candidateRole = profile?.roleTitle || profile?.techStack || 'Full Stack Developer';
    const candidateStack = profile?.techStack || 'C#, .NET Core, SQL Server, React';
    const candidateExp = profile?.experienceYears || '3';
    const candidateOrigin = profile?.originCountry || 'Argentina';
    const candidateLinkedin = profile?.linkedinUrl || '[LinkedIn Profile URL]';
    const candidateGithub = profile?.githubUrl || '[GitHub Profile URL]';
    const hasDegree = profile?.hasDegree || false;

    if (isEn) {
      if (isFormal) {
        const visaClause = hasDegree
          ? `Regarding my educational background and qualifications: I hold a university degree in Computer Science / Software Engineering and possess over ${candidateExp} years of hands-on professional experience in the technology industry. I fully meet all prerequisites for EU work authorization pathways, such as the EU Blue Card or national Highly Qualified Worker programs.`
          : `Regarding my immigration status: I am seeking a relocation opportunity with visa sponsorship. I would like to highlight that under current European Union directives (such as the updated EU Blue Card regulations for IT professionals in Germany and the Highly Skilled Migrant program in the Netherlands), I qualify for work visa pathways based on my ${candidateExp}+ years of proven professional experience in the tech sector, without requiring a university diploma.`;

        return `Subject: Application for ${jobTitle} - Visa Sponsorship & Relocation Support

Dear Hiring Team at ${company},

I am writing to express my strong interest in the ${jobTitle} position at ${company} in ${location}. With over ${candidateExp} years of hands-on professional experience developing robust software solutions using ${candidateStack}, I am confident in my ability to contribute effectively to your engineering team.

In my recent roles, I have designed and maintained scalable RESTful APIs, optimized complex database schemas, and developed clean, responsive user interfaces. This combination of deep backend expertise and modern frontend skills allows me to own features end-to-end and deliver reliable web applications.

${visaClause}

I am highly motivated to bring my technical skills and proactive work ethic to ${company} and facilitate a smooth transition to ${location}. Thank you for your time and consideration. I look forward to the possibility of discussing how my experience aligns with your team's needs.

Sincerely,

${candidateName}
${candidateLinkedin}
${candidateGithub}`;
      } else {
        // Cold Outreach (Mensaje corto para LinkedIn / Recruiter)
        const visaShortClause = hasDegree
          ? `I am currently based in ${candidateOrigin} and looking to relocate to ${location} with visa sponsorship. I hold a recognized university degree in Computer Science and +${candidateExp} years of professional experience, fully meeting EU Blue Card requirements.`
          : `I am currently based in ${candidateOrigin} and looking to relocate to ${location} with visa sponsorship. Please note that I fully qualify for IT work permit pathways based on proven professional experience (+${candidateExp} years) under EU regulations without requiring a degree.`;

        return `Hi [Recruiter Name],

I hope you're having a great week! 

I recently noticed the opening for ${jobTitle} at ${company} in ${location} and felt compelled to reach out. I am a ${candidateRole} with over ${candidateExp} years of professional experience specializing in ${candidateStack}.

I have a proven track record of building scalable APIs and creating clean frontend experiences. ${visaShortClause}

Would you be open to a brief chat to see if my background matches what you are looking for in the team? 

Thank you!

Best regards,

${candidateName}
${candidateLinkedin}`;
      }
    } else {
      // Español
      if (isFormal) {
        const visaClauseEs = hasDegree
          ? `Con respecto a mi formación académica y cualificación migratoria: cuento con titulación universitaria en el área tecnológica e informática y más de ${candidateExp} años de experiencia laboral demostrable. Cumplo plenamente con todos los requisitos para la tramitación ágil de visados de trabajo en la Unión Europea, tales como la Tarjeta Azul de la UE o la visa de Profesionales Altamente Cualificados.`
          : `Con respecto al aspecto migratorio: requiero patrocinio de visado para mi incorporación. Cabe destacar que, bajo las regulaciones vigentes en la Unión Europea (como la visa de Profesionales Altamente Cualificados en España o la nueva directiva de Tarjeta Azul para IT en Alemania), cualifico plenamente para el permiso de trabajo basándome en mi experiencia laboral certificada (+${candidateExp} años), sin que sea indispensable poseer un título universitario homologado.`;

        return `Asunto: Candidatura para ${jobTitle} - Relocalización y Patrocinio de Visado

Estimado equipo de selección de ${company},

Le escribo para manifestar mi gran interés en la posición de ${jobTitle} en ${company} para la oficina de ${location}. Cuento con más de ${candidateExp} años de experiencia profesional en el desarrollo de software utilizando ${candidateStack}, por lo que estoy convencido de que puedo aportar un gran valor a su equipo de ingeniería.

A lo largo de mi trayectoria, me he especializado en diseñar y mantener APIs REST seguras, optimizar bases de datos y construir interfaces de usuario limpias y eficientes. Esta combinación de habilidades me permite asumir la responsabilidad completa de las funcionalidades, desde el backend hasta el frontend.

${visaClauseEs}

Agradezco de antemano su tiempo y consideración al revisar mi candidatura. Quedo a su entera disposición para mantener una entrevista y conversar sobre cómo mi perfil puede contribuir a los objetivos de ${company}.

Atentamente,

${candidateName}
${candidateLinkedin}
${candidateGithub}`;
      } else {
        // Cold Outreach en Español
        const visaShortClauseEs = hasDegree
          ? `Actualmente me encuentro en ${candidateOrigin} y tengo como objetivo relocalizarme en ${location}. Cuento con titulación universitaria en informática y más de ${candidateExp} años de experiencia, cumpliendo con los requisitos legales para la tramitación de visado de trabajo.`
          : `Actualmente me encuentro en ${candidateOrigin} y tengo como objetivo relocalizarme en ${location}. Es importante destacar que cualifico para los permisos de trabajo en el sector IT bajo la vía de experiencia profesional acreditada (+${candidateExp} años), sin requerir título homologado.`;

        return `Hola [Nombre del Selector/a],

¡Espero que estés muy bien!

Me pongo en contacto contigo porque vi la oferta de ${jobTitle} para ${company} en ${location} y considero que mi perfil se alinea con lo que buscan. Soy ${candidateRole} con más de ${candidateExp} años de experiencia trabajando activamente con ${candidateStack}.

Me especializo en diseñar APIs robustas y crear interfaces web dinámicas. ${visaShortClauseEs}

¿Tendrías unos minutos para realizar una breve llamada y ver si mi perfil encaja con lo que necesita el equipo?

¡Muchas gracias por tu tiempo!

Un saludo cordial,

${candidateName}
${candidateLinkedin}`;
      }
    }
  };

  useEffect(() => {
    setGeneratedLetter(generateLetterText());
  }, [jobTitle, company, location, language, templateType, profile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-100 flex items-center gap-2">
            Generador de Cover Letter & Cold Outreach
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Cartas de presentación y mensajes de LinkedIn adaptados automáticamente con tu perfil, LinkedIn y situación de titulación/visado.
          </p>
        </div>

        {/* Botón para editar perfil */}
        <button
          onClick={onOpenProfileModal}
          className="flex items-center gap-2 px-3.5 py-2 bg-dark-900 hover:bg-dark-800 border border-dark-800 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 transition-all self-start md:self-auto shadow-sm"
        >
          <User className="w-4 h-4" />
          <span>Configurar Mi Perfil</span>
        </button>
      </div>

      {/* Banner de datos del perfil activo */}
      <div className="bg-dark-900/60 border border-dark-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500 font-medium">Candidato:</span>
            <span className="font-bold text-slate-100">{profile?.name || 'No configurado'}</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            {profile?.hasDegree ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                Con Título Universitario
              </span>
            ) : (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Sin Título (Acreditación por Experiencia IT)
              </span>
            )}
          </div>
          <span className="text-slate-700 hidden sm:inline">•</span>
          <div className="text-slate-400 truncate max-w-xs">
            <span className="text-slate-500">LinkedIn: </span>
            <span className="text-sky-400 font-mono">{profile?.linkedinUrl || 'No indicado'}</span>
          </div>
        </div>

        <button
          onClick={onOpenProfileModal}
          className="text-xs text-blue-400 hover:underline font-semibold"
        >
          Cambiar datos
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Formulario de parámetros (Columna izquierda) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-panel rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
            <h3 className="font-display font-bold text-base text-slate-200 flex items-center gap-2 border-b border-dark-800/80 pb-3">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Parámetros de la Oferta
            </h3>

            {/* Puesto */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                Título del Puesto
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Ej. Senior .NET Developer"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            {/* Empresa */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                Nombre de la Empresa
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ej. Booking.com"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            {/* Ubicación */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Ubicación (País/Ciudad)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej. Amsterdam, Netherlands"
                className="w-full bg-dark-950 border border-dark-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            {/* Selección de Idioma */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-slate-500" />
                Idioma
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    language === 'en'
                      ? 'bg-blue-600/10 border-blue-500/40 text-blue-400'
                      : 'bg-dark-950/60 border-dark-800 text-slate-400 hover:bg-dark-800'
                  }`}
                >
                  Inglés (Recomendado)
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    language === 'es'
                      ? 'bg-blue-600/10 border-blue-500/40 text-blue-400'
                      : 'bg-dark-950/60 border-dark-800 text-slate-400 hover:bg-dark-800'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>

            {/* Tipo de Plantilla */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                Estilo de Comunicación
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTemplateType('formal')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    templateType === 'formal'
                      ? 'bg-blue-600/10 border-blue-500/40 text-blue-400'
                      : 'bg-dark-950/60 border-dark-800 text-slate-400 hover:bg-dark-800'
                  }`}
                >
                  Carta Formal (Email/Web)
                </button>
                <button
                  onClick={() => setTemplateType('cold-outreach')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    templateType === 'cold-outreach'
                      ? 'bg-blue-600/10 border-blue-500/40 text-blue-400'
                      : 'bg-dark-950/60 border-dark-800 text-slate-400 hover:bg-dark-800'
                  }`}
                >
                  Contacto en Frío (Recruiter)
                </button>
              </div>
            </div>

          </div>

          {/* Guía informativa de visados según estado de titulación */}
          <div className="glass-panel border-blue-500/10 bg-blue-950/15 rounded-2xl p-5 md:p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
              {profile?.hasDegree ? 'Info: Visados con Título Universitario' : 'Info: Visados Sin Título Universitario'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              {profile?.hasDegree ? (
                <>
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Tarjeta Azul UE (Blue Card):</strong> Vía prioritaria y rápida en Alemania, Países Bajos y España para graduados con contrato tecnológico.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Proceso de Homologación:</strong> Permite agilizar trámites consulares mediante títulos apostillados de La Haya.</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>España (Ley 14/2013 PAC):</strong> Permite acreditar cualificación técnica mediante vida laboral y contratos de +3 años sin exigir título homologado.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Alemania (Ley de Inmigración IT):</strong> Tarjeta Azul o visado técnico demostrando al menos 3 años de experiencia en IT en los últimos 7 años.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Países Bajos (Kennismigrant):</strong> No exige título si el contrato cumple el umbral salarial legal correspondiente.</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Visualizador del texto generado (Columna derecha) */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <div className="glass-panel rounded-2xl p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4 shadow-xl">
            
            {/* Header visualizador */}
            <div className="flex justify-between items-center border-b border-dark-800/80 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {templateType === 'formal' ? 'Cover Letter Generada' : 'Mensaje Corto LinkedIn'}
                </span>
              </div>
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-950/80 hover:bg-dark-800 border border-dark-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    Copiar texto
                  </>
                )}
              </button>
            </div>

            {/* Textarea editable con la carta */}
            <textarea
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              className="w-full flex-1 bg-dark-950/40 border border-dark-800/60 rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500/30 leading-relaxed resize-none min-h-[380px] lg:min-h-[420px]"
            />

            {/* Aviso */}
            <p className="text-[10px] text-slate-500 italic text-center">
              * El texto se genera automáticamente con los datos de tu perfil. Puedes editarlo libremente en el recuadro antes de copiarlo.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}

export default CoverLetter;
