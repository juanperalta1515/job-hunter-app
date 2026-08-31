# 🚀 Job Hunter EU — Oportunidades IT con Visa Sponsorship en Europa

> **Plataforma web interactiva para desarrolladores de software que buscan empleo con patrocinio de visa (Visa Sponsorship) y paquetes de relocalización en la Unión Europea (España, Alemania, Países Bajos, etc.).**

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![Netlify](https://img.shields.io/badge/Netlify-Serverless_Functions-00C7B7?logo=netlify)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%99%A5-emerald)

---

## 📖 Descripción del Proyecto

**Job Hunter EU** nace como una herramienta integral para resolver los dos mayores obstáculos al buscar trabajo en Europa desde el exterior:
1. **Encontrar ofertas reales con patrocinio de visa:** Centralización de oportunidades que ofrecen soporte migratorio y beneficios de relocalización.
2. **Presentación adaptativa según titulación:** Redacción de cartas de presentación (*Cover Letters*) y mensajes para reclutadores que justifican legalmente la postulación, distinguiendo si el profesional cuenta con **Título Universitario** (vía tradicional de Tarjeta Azul UE) o postula por **Vía de Experiencia IT (+3 años demostrables)** bajo leyes como la *Ley de Emprendedores (PAC) en España* o la *Ley de Inmigración de Especialistas en Alemania*.

---

## ✨ Funcionalidades Principales

### 🔍 1. Búsquedas Diarias & Filtrado Inteligente de Ofertas
- **Exploración en Vivo:** Catálogo de ofertas laborales con detección automática de beneficios (*Visa Sponsorship, Relocation Package, Beneficio fiscal 30% Ruling, etc.*).
- **Filtros Ágiles:** Filtra por país destino (*España, Alemania, Países Bajos o toda la UE*) y stack tecnológico (*.NET, C#, React, Angular, Node, SQL Server, etc.*).
- **Buscador Dinámico:** Búsqueda libre por puesto, empresa o requerimientos clave en tiempo real.

### 👤 2. Carga de Perfil Personalizado (100% Configurable)
- **3 Métodos de Carga:**
  - 📄 **Cargar Archivo CV:** Soporte para adjuntar currículum en PDF, DOCX o TXT con indicador de carga y tamaño.
  - 🔗 **Vincular LinkedIn & GitHub:** Integración de enlaces directos a perfiles sociales.
  - ✍️ **Carga Manual:** Configuración de Nombre, Rol profesional, Stack técnico, Años de experiencia, País de origen y Destinos objetivo.
- **Selector de Titulación Académica:** Permite alternar entre *🎓 Con Título Universitario* y *💼 Sin Título (Acreditación por Experiencia IT +3 años)*.
- **Privacidad y Persistencia:** Todos los datos se almacenan exclusivamente de forma local en el navegador del usuario (`localStorage`).

### ✉️ 3. Generador de Cover Letter & Cold Outreach para Reclutadores
- **Cartas Formales y Mensajes Cortos:** Redacción en un clic de cartas de presentación para postulaciones web/email y mensajes directos para reclutadores en LinkedIn.
- **Bilingüe (Español / Inglés):** Adaptación idiomática instantánea.
- **Argumentación Legal Automática:** Modifica automáticamente las cláusulas migratorias citando las normativas europeas aplicables según la situación académica del usuario.
- **Autocompletado Dinámico:** Firma y enlaces completados automáticamente con los datos del perfil cargado.

### 📋 4. Job Tracker (Tablero de Seguimiento de Candidaturas)
- **Gestión de Estados:** Organiza postulaciones en *Pendiente, Aplicado, En Proceso y Descartado*.
- **Bitácora y Fechas:** Registro de fechas de postulación, notas de entrevistas, salarios conversados y próximos pasos.
- **Métricas Rápidas:** Contador visual de candidaturas activas y resultados.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/), JavaScript (ESModules) |
| **Estilos & UI** | [Tailwind CSS](https://tailwindcss.com/), Glassmorphism, [Lucide React](https://lucide.dev/) (Iconografía) |
| **Backend / API** | [Netlify Serverless Functions](https://docs.netlify.com/functions/overview/) (Node.js) |
| **Almacenamiento** | Browser Web Storage API (`localStorage`) para datos privados y tracker |
| **Despliegue** | [Netlify](https://www.netlify.com/) con CI/CD automático |

---

## 🤝 Guía para Desarrolladores: ¿Cómo Colaborar con Nuevas APIs?

El proyecto está diseñado de forma modular para que cualquier desarrollador pueda sumar nuevas APIs de búsqueda de empleo (por ejemplo: *RapidAPI JSearch, Remotive, Adzuna, LinkedIn Jobs, Jooble, Arbeitnow*).

### 1. Ubicación del Backend Serverless
> 📂 **Archivo:** [`netlify/functions/jobs.js`](netlify/functions/jobs.js)

En este archivo se ejecutan las funciones Serverless en Node.js. Al correr en el backend:
- Tus **API Keys privadas están protegidas** y nunca se exponen al cliente.
- Se evitan problemas de **CORS** en el navegador.

#### Ejemplo para añadir una nueva API:
```javascript
// netlify/functions/jobs.js

const fetchFromCustomJobAPI = async (searchTerm, location) => {
  const url = `https://api.tuproveedor.com/v1/jobs?q=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`;
  
  const data = await fetchJson(url, {
    headers: {
      'Authorization': `Bearer ${process.env.MI_NUEVA_API_KEY}`
    }
  });

  // Mapear al esquema estándar unificado:
  return (data.jobs || []).map(item => ({
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

### 2. Variables de Entorno (API Keys)
- **En Netlify:** Ve a tu panel en *Site configuration > Environment variables* y agrega tus claves (ej. `RAPIDAPI_KEY`, `ADZUNA_APP_KEY`, etc.).
- **En Local:** Crea un archivo `.env` en la raíz de `job-hunter-app` con tus claves.

### 3. Cliente Frontend & Fallback Offline
> 📂 **Archivo:** [`src/services/api.js`](src/services/api.js)

Maneja la llamada `/api/jobs` y cuenta con un catálogo de *fallback mocks* para que la aplicación funcione fluidamente en entornos de desarrollo offline.

---

## 💻 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/juanperalta1515/job-hunter-app.git
   cd job-hunter-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue en Netlify

El repositorio incluye la configuración lista en [`netlify.toml`](netlify.toml):
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
Cualquier `push` a la rama `main` disparará automáticamente el despliegue en Netlify.

---

## 📄 Licencia
Este proyecto es de código abierto bajo la licencia MIT. ¡Pull Requests y sugerencias son bienvenidas!
