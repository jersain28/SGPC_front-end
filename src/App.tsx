import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Confirmacion from './interfacesUser/Confirmacion';
import Home from './interfacesUser/Home';
import RegistroTramite from './interfacesUser/RegistroTramite';

import Login from "./interfacesAdmin/Login";

import SuccessPage from "./interfacesAdmin/SuccessPage";

import Register from "./interfacesAdmin/Register";

import AdminDashboard from "./interfacesAdmin/AdminDashboard";
import GestionSolicitudes from "./interfacesAdmin/GestionSolicitudes";
import HomeAdmin from "./interfacesAdmin/HomeAdmin";
import ModuloReportes from './interfacesAdmin/ModuloReportes';
import ValidacionDocumentos from './interfacesAdmin/ValidacionDocumentos';
import LoginUser from './interfacesUser/LoginUser';
import RegisterUser from './interfacesUser/RegisterUser';

function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<RegistroTramite />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/Login" element={<LoginUser />} />
        <Route path="/Registro" element={<RegisterUser />} />
        
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/registro" element={<Register />} />
        <Route path="/admin/exito" element={<SuccessPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/ValidacionDocumentos" element={<ValidacionDocumentos />} />
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/GestionSolicitudes" element={<GestionSolicitudes />} />
        <Route path="/admin/ModuloReportes" element={<ModuloReportes />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;