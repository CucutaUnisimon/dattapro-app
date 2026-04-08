import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NetworkingSearch from './pages/NetworkingSearch';
import ProfileDetail from './pages/ProfileDetail';
import PerfilWizard from './components/PerfilWizard/PerfilWizard';
import AdminUsers from './pages/AdminUsers';
import Inicio from './pages/Inicio';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Layout Component to handle persistent Navbar and Sidebar
const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Don't show Navbar/Sidebar on auth pages
  const hideLayout = ['/login', '/register'].includes(location.pathname) || 
                     (location.pathname === '/' && !localStorage.getItem('token'));

  if (hideLayout) {
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
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/network" element={<NetworkingSearch />} />
          <Route path="/perfil/ver/:id" element={<ProfileDetail />} />
          <Route path="/perfil" element={<PerfilWizard />} />
          <Route path="/admin" element={<AdminUsers />} /> {/* Admin specific route */}
          <Route path="/" element={<RootRoute />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
