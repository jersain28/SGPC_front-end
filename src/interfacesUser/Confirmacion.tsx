import React from 'react';

const Confirmacion: React.FC = () => {
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

      {/* Contenido Central */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-[#ECECEC] w-full max-w-lg rounded-[50px] p-12 shadow-sm text-center">
          
          {/* Icono de Check Verde */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#58D68D] rounded-2xl p-4 shadow-lg transform -rotate-3">
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Mensajes Principales */}
          <div className="space-y-4 mb-8">
            <h1 className="text-gray-800 font-bold text-lg leading-tight">
              Documentos recibidos con éxito.<br />
              Espere a la revisión de los documentos por el administrador
            </h1>
            
            <p className="text-gray-600 text-[11px] leading-relaxed px-4">
              <span className="font-bold">Nota:</span> Guarde su folio bien con el podrá 
              hacer el seguimiento de su proceso y posteriormente después de la aprobación 
              de sus documentos podrá descargar su permiso de panteón
            </p>
          </div>

          {/* Recuadro de Información de Folio */}
          <div className="bg-white rounded-3xl p-6 mx-4 border border-gray-200 shadow-inner mb-10">
            <div className="flex justify-between text-left text-xs text-gray-700 space-y-2 flex-col">
              <div className="flex justify-between items-center">
                <span className="font-bold">Folio de Registro</span>
                <span className="font-medium text-gray-500">CN-2025-8921</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Fecha de Emisión</span>
                <span className="font-medium text-gray-500">7 Febrero 2025</span>
              </div>
            </div>
          </div>

          {/* Botón Volver */}
          <button className="text-[#2E4053] font-bold text-xs hover:underline transition-all">
            Volver a la pantalla de inicio
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#C0392B] text-white py-10 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px]">
          <div className="space-y-1">
            <p className="font-bold">2024 Comunidad Nativitas. Todos los derechos reservados.</p>
            <p className="opacity-80 font-medium">Gobierno Municipal – Administración 2024–2027</p>
          </div>
          
          <div className="flex gap-8 font-bold">
            <button className="hover:opacity-75">Aviso de Privacidad</button>
            <button className="hover:opacity-75">Términos y Condiciones</button>
            <button className="hover:opacity-75">Soporte</button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Confirmacion;