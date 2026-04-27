import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Home from './ciudadano/Home';

import RegistroTramite from './ciudadano/RegistroTramite';

import Login from "./Admin/Login";

import SuccessPage from "./Admin/SuccessPage";

import AdminDashboard from "./Admin/AdminDashboard";
import GenerarPermiso from './Admin/GenerarPermiso';
import GestionSolicitudes from "./Admin/GestionSolicitudes";
import HomeAdmin from "./Admin/HomeAdmin";
import ModuloReportes from './Admin/ModuloReportes';
import Register from './Admin/Register';
import ValidacionDocumentos from './Admin/ValidacionDocumentos';
import CorregirTramite from './ciudadano/CorregirTramite';
import LoginUser from './ciudadano/LoginUser';
import MisTramites from "./ciudadano/MisTramites";
import PermisoFinal from './ciudadano/PermisoFinal';
import RegisterUser from './ciudadano/RegisterUser';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        // Routes para usuarios
        <Route path="/" element={<Home />} />

        <Route path="/registroTramite" element={
          <> <RegistroTramite /> </>
        } />


        <Route path="/login" element={
         <> <LoginUser /> </>
        } />

        <Route path="/registro" element={
          <> <RegisterUser /> </>
        } />

        <Route path="/misTramites" element={
          <> <MisTramites /> </>
        } />

        <Route path="/permisoFinal" element={
          <> <PermisoFinal /> </>
        } />
        
        <Route path="/corregir-tramite/:id" element={<CorregirTramite />} />


        // Routes para admin
        {/* El Login es lo único abierto para el personal */}
        <Route path="/admin/login" element={
          <> <Login /> </>
        } />

        {/* Todo lo demás queda "atrapado" dentro de  */}
        <Route path="/admin/dashboard" element={
          <> <AdminDashboard /> </>
        } />

        <Route path="/admin/registrar_trabajador" element={
          <> <Register /> </>
        } />

        <Route path="/admin/solicitudes" element={
          <> <GestionSolicitudes /> </>
        } />

        <Route path="/admin" element={<HomeAdmin />} />

        <Route path="/admin/registro" element={
          <> <Register /> </>
        } />

        <Route path="/admin/exito" element={
          <> <SuccessPage /> </>
        } />

        <Route path="/admin/validacionDocumentos/:id" element={
          <> <ValidacionDocumentos /> </>
        } />

        <Route path="/admin/moduloReportes" element={
          <> <ModuloReportes /> </>
        } />

        <Route path="/admin/tramites/:id/generar-permiso" element={
          <> <GenerarPermiso /> </>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;