import React from 'react';
import panteon from '../assets/panteon.jpg';

const HomeAdmin: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      {/* Header */}
      <nav className="bg-white py-6 px-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#C0392B] font-bold text-xl uppercase tracking-wider">
            Comunidad de Nativitas
          </h2>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 gap-10">
        
        {/* Left Side: Text and Buttons */}
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
            <button className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg">
              Iniciar Sesión
            </button>
            <button className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg">
              Crear Usuario
            </button>
          </div>

          {/* Indicators */}
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

        {/* Right Side: Image with shadow and rounded corners */}
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
            <button>Aviso de Privacidad</button>
            <button>Términos y Condiciones</button>
            <button>Soporte</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeAdmin;