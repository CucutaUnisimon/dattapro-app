import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NetworkingSearch from './pages/NetworkingSearch';
import PerfilWizard from './components/PerfilWizard/PerfilWizard';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/network" element={<NetworkingSearch />} />
          <Route path="/perfil" element={<PerfilWizard />} />
          <Route path="/admin" element={<AdminUsers />} /> {/* Admin specific route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
