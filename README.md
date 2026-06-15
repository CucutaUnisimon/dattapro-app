# dattapro-app

Frontend de **DattaPro** — plataforma de gestión académica y networking para docentes universitarios. Construido con **React 19**, **Vite** y **Tailwind CSS 4**.

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Lenguaje | JavaScript (ESM) |
| Framework UI | React 19 |
| Build tool | Vite 7 |
| Estilos | Tailwind CSS 4 |
| Enrutamiento | React Router DOM 7 |
| Formularios | React Hook Form |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Selects | React Select |
| Notificaciones | Sonner |
| Autenticación | JWT (jwt-decode) |

---

## 📁 Estructura del proyecto

```
dattapro-app/
├── public/
├── src/
│   ├── assets/             # Imágenes y recursos estáticos
│   ├── components/
│   │   ├── Directory/      # Componentes del directorio/networking
│   │   ├── PerfilWizard/   # Wizard multi-paso para edición de perfil
│   │   ├── masterData/     # Componentes de datos maestros
│   │   ├── Navbar.jsx      # Barra de navegación superior
│   │   ├── Sidebar.jsx     # Menú lateral con navegación por roles
│   │   └── ProtectedRoute.jsx  # HOC de control de acceso por rol
│   ├── config/             # Configuración del cliente HTTP (axios/fetch)
│   ├── context/            # Contextos de React (auth, tema, etc.)
│   ├── hooks/              # Custom hooks
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Inicio.jsx
│   │   ├── Convocatorias.jsx
│   │   ├── ConvocatoriasDetalles.jsx
│   │   ├── ConvocatoriaForm.jsx
│   │   ├── MisConvocatorias.jsx
│   │   ├── NetworkingSearch.jsx          # Búsqueda de red (Profesores)
│   │   ├── NetworkingSearchDirectivo.jsx # Inteligencia académica (Directivos)
│   │   ├── ProfileDetail.jsx
│   │   ├── AdminUsers.jsx
│   │   ├── GestionDatosMaestros.jsx
│   │   ├── CambioPasswordView.jsx
│   │   └── Unauthorized.jsx
│   ├── services/
│   │   └── masterDataService.js
│   ├── utils/
│   ├── App.jsx             # Enrutador principal con control de roles
│   ├── main.jsx
│   └── index.css
├── .env                    # Variables de entorno locales (no commitear)
├── .env.example            # Plantilla de variables de entorno
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## ⚙️ Configuración

### Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|----------|-------------|------------------|
| `VITE_API_URL` | URL base de la API REST backend | `http://localhost:8080/api/v1` |

> **Importante:** Todas las variables expuestas al navegador deben tener el prefijo `VITE_`.

---

## 🚀 Ejecución local

### Requisitos previos

- Node.js 20+
- npm 10+
- La API backend (`dattapro-api`) corriendo en `http://localhost:8080`

### Pasos

```bash
# 1. Instala las dependencias
npm install

# 2. Configura las variables de entorno
cp .env.example .env

# 3. Inicia el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173/dattapro`

> El `basename` de React Router está configurado como `/dattapro`, por lo que todas las rutas parten de ese prefijo.

---

## 🗺️ Rutas de la aplicación

| Ruta | Página | Roles permitidos |
|------|--------|-----------------|
| `/dattapro/login` | Inicio de sesión | Público |
| `/dattapro/register` | Registro | Público |
| `/dattapro/` | Inicio / Dashboard | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/perfil` | Editar perfil (Wizard) | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/perfil/ver/:id` | Ver perfil de otro usuario | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/convocatorias` | Listado de convocatorias | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/convocatorias/detalles/:id` | Detalle de convocatoria | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/convocatorias/crear` | Crear convocatoria | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/convocatorias/editar/:id` | Editar convocatoria | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/mis-convocatorias` | Mis convocatorias | ADMIN, DIRECTIVO, PROFESOR |
| `/dattapro/network` | Búsqueda de red (Networking) | ADMIN, PROFESOR |
| `/dattapro/inteligencia-academica` | Inteligencia académica | ADMIN, DIRECTIVO |
| `/dattapro/admin` | Gestión de usuarios | ADMIN |
| `/dattapro/admin/datos-maestros` | Gestión de datos maestros | ADMIN |
| `/dattapro/seguridad` | Cambio de contraseña | ADMIN, DIRECTIVO, PROFESOR |

---

## 🔐 Autenticación y roles

- La autenticación se basa en **JWT** almacenado en `localStorage`.
- El componente `ProtectedRoute` verifica el token y el rol antes de renderizar cada página.
- Los roles disponibles son `ADMIN`, `DIRECTIVO` y `PROFESOR`.
- Si el usuario accede a una ruta no autorizada, es redirigido a `/dattapro/unauthorized`.

---

## 📦 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Análisis estático con ESLint |

---

## 🏗️ Build para producción

```bash
npm run build
```

Los archivos generados estarán en el directorio `dist/`. Despliega su contenido en tu servidor web configurando que todas las rutas sirvan `index.html` (SPA fallback).
