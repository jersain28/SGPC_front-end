import React from 'react';

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
    {/* Header */}
      <nav className="bg-white py-6 px-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#C0392B] font-bold text-xl uppercase tracking-wider">
            Comunidad de Nativitas
          </h2>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-6">
        
        {/* Icono de Éxito (SVG manual para evitar dependencia de lucide-react) */}
        <div className="text-green-500">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Mensaje */}
        <h3 className="text-xl font-medium text-gray-800">
          Usuario creado exitosamente
        </h3>

        {/* Botón Regresar */}
        <div className="pt-4">
          <button
            onClick={() => window.location.href = '/'} // O usar Link de react-router-dom
            className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg"
          >
            Regresar al Inicio
          </button>
        </div>

      </main>
    </div>
  );
};

export default SuccessPage;