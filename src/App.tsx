import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Confirmacion from './interfacesUser/Confirmacion';
import Home from './interfacesUser/Home';
import RegistroTramite from './interfacesUser/RegistroTramite';

import Login from "./interfacesAdmin/Login";

import SuccessPage from "./interfacesAdmin/SuccessPage";

import AdminDashboard from "./interfacesAdmin/AdminDashboard";
import GestionSolicitudes from "./interfacesAdmin/GestionSolicitudes";
import HomeAdmin from "./interfacesAdmin/HomeAdmin";
import ModuloReportes from './interfacesAdmin/ModuloReportes';
import Register from "./interfacesAdmin/Register";
import ValidacionDocumentos from './interfacesAdmin/ValidacionDocumentos';
import LoginUser from './interfacesUser/LoginUser';
import MisTramites from "./interfacesUser/MisTramites";
import PermisoFinal from './interfacesUser/PermisoFinal';
import RegisterUser from './interfacesUser/RegisterUser';

function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        // Routes para usuarios
        <Route path="/" element={<Home />} />
        <Route path="/registroTramite" element={<RegistroTramite />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/registro" element={<RegisterUser />} />
        <Route path="/misTramites" element={<MisTramites />} />
        <Route path="/permisoFinal" element={<PermisoFinal />} />
        
        // Routes para admin
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/registro" element={<Register />} />
        <Route path="/admin/exito" element={<SuccessPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/validacionDocumentos" element={<ValidacionDocumentos />} />
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/gestionSolicitudes" element={<GestionSolicitudes />} />
        <Route path="/admin/moduloReportes" element={<ModuloReportes />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;