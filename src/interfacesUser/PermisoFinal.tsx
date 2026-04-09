import React from 'react';
import Navbar from '../Navbar'; // Usando el componente de arriba

const PermisoFinal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar userName="Jorge Martínez López" />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-[#C0392B] p-8 text-center text-white">
            <div className="inline-block bg-white/20 p-4 rounded-full mb-4 text-4xl">📜</div>
            <h1 className="text-2xl font-bold italic">¡Trámite Concluido con Éxito!</h1>
            <p className="opacity-90 text-sm mt-2 font-medium">Su permiso de uso de panteón ha sido generado y firmado digitalmente.</p>
          </div>

          <div className="p-10 space-y-8 text-center">
            <div className="flex flex-col items-center gap-4 py-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <span className="text-5xl">📄</span>
              <div>
                <p className="font-bold text-gray-800">PERMISO_PANTEON_CN2026.pdf</p>
                <p className="text-xs text-gray-400 font-medium uppercase mt-1">Documento Oficial Validado</p>
              </div>
              <button className="mt-4 bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-3 px-10 rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95">
                <span>⬇️</span> Descargar Documento
              </button>
            </div>

            <div className="text-[11px] text-gray-400 leading-relaxed px-10 italic">
              Este documento cuenta con un código de validación digital único. Asegúrese de imprimirlo y presentarlo cuando se le sea requerido por la administración del panteón.
            </div>

            <button className="text-gray-500 font-bold text-xs hover:text-[#C0392B] underline decoration-2 underline-offset-4">
              Volver a Mis Trámites
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PermisoFinal;