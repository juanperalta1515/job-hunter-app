# 🚀 Job Hunter EU — Oportunidades IT con Visa Sponsorship en Europa

Plataforma interactiva diseñada para desarrolladores de software que buscan oportunidades laborales con **patrocinio de visa (Visa Sponsorship)** y **paquetes de relocalización** en la Unión Europea (España, Alemania, Países Bajos y resto de la UE), adaptada tanto para profesionales **con título universitario** como para quienes postulan **por la vía de experiencia profesional certificada (+3 años en IT)**.

---

## ✨ Características Principales

1. **Búsquedas Diarias & Filtrado Inteligente:**
   - Visualización de ofertas en vivo con tags de tecnologías (.NET, C#, React, Angular, SQL Server, etc.).
   - Filtros por país y stack tecnológico con detección de beneficios de visa y relocalización.
2. **Perfil Candidato 100% Configurable:**
   - Cualquier persona puede cargar su **Nombre**, **URL de LinkedIn**, **GitHub**, **Años de Experiencia**, **País de Origen** y **Destinos en la UE**.
   - Selector clave: **Con Título Universitario** vs **Sin Título (Acreditación por Experiencia IT)**.
   - Datos guardados de forma privada y local en el navegador (`localStorage`).
3. **Generador de Cover Letter & Cold Outreach:**
   - Redacción instantánea de cartas formales y mensajes directos para reclutadores de LinkedIn (en Español e Inglés).
   - Adaptación automática de los argumentos legales y migratorios según el perfil y titulación del candidato (Tarjeta Azul de la UE, Ley de Emprendedores PAC España, Ley de Inmigración IT Alemania, etc.).
4. **Job Tracker (Seguimiento de Candidaturas):**
   - Panel Kanban/Lista para registrar estados (*Pendiente, Aplicado, En Proceso, Descartado*), fechas de postulación y notas de entrevistas.

---

## 🛠️ Guía para Desarrolladores & Colaboradores: ¿Dónde configurar Nuevas APIs?

Si deseas colaborar agregando nuevas fuentes de empleo (APIs) para ampliar el catálogo de ofertas laborales, aquí tienes la guía exacta:

### 1. Ubicación del Backend Serverless (Netlify Functions)
> **Archivo:** [`netlify/functions/jobs.js`](netlify/functions/jobs.js)

En este archivo se ejecuta la función Serverless que orquesta las consultas a las APIs externas. Al correr del lado del servidor (Node.js), tus **API Keys privadas no quedan expuestas** al usuario y evitas problemas de CORS en el navegador.

#### Pasos para agregar una API:
1. Abre `netlify/functions/jobs.js`.
2. Define tu función para consultar el nuevo proveedor:
   ```javascript
   const fetchFromMyNewAPI = async (searchTerm, location) => {
     const url = `https://api.nuevoproveedor.com/v1/jobs?query=${encodeURIComponent(searchTerm)}&geo=${encodeURIComponent(location)}`;
     const res = await fetchJson(url, {
       headers: {
         'Authorization': `Bearer ${process.env.MI_NUEVA_API_KEY}`
       }
     });

     // Normaliza la respuesta al esquema estándar del proyecto:
     return (res.jobs || []).map(item => ({
       id: `custom-${item.id}`,
       title: item.title,
       company: item.company,
       location: item.location || "European Union",
       country: item.country || "EU",
       countryCode: item.country_code || "EU",
       description: item.description,
       url: item.apply_url,
       salary: item.salary || "Salario no especificado",
       postedAt: item.created_at || "Reciente",
       tags: item.skills || [".NET", "React"],
       benefits: ["Visa Sponsorship", "Relocation Package"]
     }));
   };
   ```
3. Agrega la llamada dentro del bloque principal del `exports.handler`.

---

### 2. Variables de Entorno (API Keys)

- **En Netlify:** 
  Ingresa al panel de tu sitio en [Netlify Dashboard](https://app.netlify.com) > **Site configuration** > **Environment variables** y añade tus variables secretas (por ejemplo: `RAPIDAPI_KEY`, `ADZUNA_APP_KEY`, etc.).
- **En Local:** 
  Crea un archivo `.env` en la raíz de `job-hunter-app` con tus claves para probar con `netlify dev`.

---

### 3. Cliente Frontend & Fallback Offline
> **Archivo:** [`src/services/api.js`](src/services/api.js)

Este archivo maneja la petición `fetch('/api/jobs')` desde los componentes de React hacia la Netlify Function y cuenta con un listado de *fallback mocks* para que la aplicación siempre funcione fluidamente en desarrollo offline o sin conexión.

---

## 💻 Ejecución y Despliegue

### Desarrollo Local
```bash
cd job-hunter-app
npm install
npm run dev
```

### Despliegue en Netlify
El proyecto ya cuenta con el archivo de configuración `netlify.toml` listo para producción:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```
Solo conecta tu repositorio en Netlify y el despliegue será automático.
