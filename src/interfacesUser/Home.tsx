import React from 'react';

// Definimos una "Interface" para las props si fuera necesario, 
// o para los datos que manejes.
interface StatBadgeProps {
  label: string;
  color: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ label, color }) => (
  <div className="flex items-center gap-2">
    <span className={`w-2 h-2 ${color} rounded-full`}></span>
    <span className="text-sm font-bold text-gray-700">{label}</span>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      
      {/* Header */}
      <nav className="bg-white py-6 px-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#C0392B] font-bold text-xl uppercase tracking-wider">
            Comunidad de Nativitas
          </h2>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center px-10 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="bg-gray-200 text-gray-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">
              Portal Oficial
            </span>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1]">
              Sistema de Gestión <br /> 
              del Panteón <br />
              <span className="text-gray-800">Comunidad Nativitas</span>
            </h1>
            
            <p className="text-gray-600 text-lg max-w-md leading-relaxed">
              Bienvenido a la plataforma digital para la gestión y consulta de servicios. 
              Facilitamos los trámites administrativos con respeto y transparencia.
            </p>

            <button className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg">
              Iniciar Trámite
            </button>

            <div className="flex gap-8 pt-4">
              <StatBadge label="Sistema Activo 24/7" color="bg-green-500" />
              <StatBadge label="Atención Ciudadana" color="bg-blue-400" />
            </div>
          </div>

          {/* Imagen con bordes redondeados pronunciados */}
          <div className="relative">
            <div className="rounded-[50px] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-gray-200">
              <img 
                src="https://via.placeholder.com/800x600" 
                alt="Presidencia de Comunidad"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#C0392B] text-white py-8 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-4 text-xs">
          <div>
            <p>© 2024 Comunidad Nativitas. Todos los derechos reservados.</p>
            <p className="opacity-70">Gobierno Municipal – Administración 2024-2027</p>
          </div>
          <div className="flex gap-6 font-bold">
            <button className="hover:opacity-80">Aviso de Privacidad</button>
            <button className="hover:opacity-80">Términos y Condiciones</button>
            <button className="hover:opacity-80">Soporte</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;