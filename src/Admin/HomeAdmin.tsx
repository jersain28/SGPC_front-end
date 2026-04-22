import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import panteon from '../assets/panteon.jpg';
import NavbarAdmin from '../NavbarAdmin';

const HomeAdmin: React.FC = () => {
  const navigate = useNavigate();

  // 1. Efecto para redirigir si ya está logueado
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Si ya hay token, lo mandamos directo al Dashboard
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <NavbarAdmin showAccessButtons={true} />


      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 gap-10">
        
        <div className="max-w-xl space-y-6">
          <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Portal Oficial
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Sistema de Gestión <br />
            del Panteon <br />
            Comunidad Nativitas
          </h1>
          
          <p className="text-sm md:text-base leading-relaxed text-gray-700">
            Bienvenido a la plataforma digital para la gestión y consulta de servicios. 
            Facilitamos los trámites administrativos con respeto, eficiencia y transparencia 
            para toda la comunidad.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {/* 2. Conexión a la ruta de Login */}
            <button 
              onClick={() => navigate('/admin/login')}
              className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg"
            >
              Iniciar Sesión
            </button>

            {/* 3. IMPORTANTE: En un sistema real, el "Crear Usuario" público suele no existir 
               o ser solo para ciudadanos. Si este es el botón para crear trabajadores, 
               debería estar PROTEGIDO dentro del Dashboard. 
               Si es para ciudadanos, lo mandamos a la ruta de registro.
            */}
            <button 
              onClick={() => navigate('/admin/registro')}
              className="bg-white border-2 border-[#C0392B] text-[#C0392B] hover:bg-red-50 font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg"
            >
              Crear Usuario
            </button>
          </div>

          <div className="flex gap-6 pt-4 text-xs font-bold italic">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Sistema Activo 24/7
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400"></span>
              Atención Ciudadana
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 max-w-lg">
          <div className="overflow-hidden rounded-3xl shadow-2xl transform md:rotate-1">
             <img 
              src={panteon} 
              alt="Panteon de Comunidad" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#C0392B] text-white py-6 px-10 text-[10px] mt-auto">
        <div className="max-w-6xl mx-auto flex justify-between items-center opacity-90">
          <p>2024 Comunidad Nativitas. Todos los derechos reservados.<br/>Gobierno Municipal – Administración 2024–2027</p>
          <div className="flex gap-8 font-bold">
            <button onClick={() => navigate('/privacy')}>Aviso de Privacidad</button>
            <button onClick={() => navigate('/terms')}>Términos y Condiciones</button>
            <button onClick={() => navigate('/support')}>Soporte</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeAdmin;