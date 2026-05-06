import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NetworkingSearch from './pages/NetworkingSearch';
import ProfileDetail from './pages/ProfileDetail';
import PerfilWizard from './components/PerfilWizard/PerfilWizard';
import AdminUsers from './pages/AdminUsers';
import Inicio from './pages/Inicio';
import Convocatorias from './pages/Convocatorias';
import ConvocatoriasDetalles from './pages/ConvocatoriasDetalles';
import MisConvocatorias from './pages/MisConvocatorias';
import ConvocatoriaForm from './pages/ConvocatoriaForm';
import CambioPasswordView from './pages/CambioPasswordView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Layout Component to handle persistent Navbar and Sidebar
const AppLayout = ({ children }) => {
  const location = useLocation();

  // MODIFICACIÓN: Usamos .includes o verificamos el final del path 
  // para que funcione con o sin el prefijo del servidor
  const isAuthPage = location.pathname.endsWith('/login') ||
    location.pathname.endsWith('/register');

  const isRootWithoutToken = (location.pathname === '/' || location.pathname === '/dattapro/')
    && !localStorage.getItem('token');

  if (isAuthPage || isRootWithoutToken) {
    return <main className="min-h-screen bg-slate-50 dark:bg-slate-900">{children}</main>;
  }

  return (
    <div className="h-screen bg-white dark:bg-slate-950 flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

const RootRoute = () => {
  return localStorage.getItem('token') ? <Inicio /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    /* CAMBIO CRÍTICO: Añadir el basename aquí */
    <Router basename="/dattapro">
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/network" element={<NetworkingSearch />} />
          <Route path="/perfil/ver/:id" element={<ProfileDetail />} />
          <Route path="/perfil" element={<PerfilWizard />} />
          <Route path="/admin" element={<AdminUsers />} />
          <Route path="/convocatorias" element={<Convocatorias />} />
          <Route path="/convocatorias/detalles/:id" element={<ConvocatoriasDetalles />} />
          <Route path="/mis-convocatorias" element={<MisConvocatorias />} />
          <Route path="/convocatorias/crear" element={<ConvocatoriaForm />} />
          <Route path="/convocatorias/editar/:id" element={<ConvocatoriaForm />} />
          <Route path="/seguridad" element={<CambioPasswordView />} />
          <Route path="/" element={<RootRoute />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
