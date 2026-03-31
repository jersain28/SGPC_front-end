import React from 'react';

const RegistroTramite: React.FC = () => {
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

      <main className="flex-grow p-8 max-w-5xl mx-auto w-full bg-white my-6 shadow-sm rounded-lg">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Carga de Documentacion Requerida</h1>
          <p className="text-gray-500 text-sm">
            Por favor, suba los documentos digitales en formato PDF. Tamaño máximo 5MB por archivo.
          </p>
        </div>

        {/* --- Sección 1: Información del Trámite --- */}
        <section className="mb-12">
          <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-wider">Informacion del tramite</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Nombre Completo del Finado</label>
              <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-[#C0392B] outline-none transition-colors" placeholder="..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Fecha de Nacimiento</label>
              <input type="date" className="w-full border-b border-gray-300 py-2 focus:border-[#C0392B] outline-none transition-colors text-gray-400" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Nombre del Declarante</label>
              <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-[#C0392B] outline-none transition-colors" placeholder="..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Parentesco del Finado</label>
              <select className="w-full border-b border-gray-300 py-2 focus:border-[#C0392B] outline-none transition-colors bg-transparent">
                <option>Conyuge</option>
                <option>Hijo/a</option>
                <option>Padre / Madre</option>
                <option>Hermano/a</option>
                <option>Otro Familiar</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Correo Electronico del Declarante</label>
              <input type="email" className="w-full border-b border-gray-300 py-2 focus:border-[#C0392B] outline-none transition-colors" placeholder="..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">Telefono de Contacto del Declarante</label>
              <input type="tel" className="w-full border-b border-gray-300 py-2 focus:border-[#C0392B] outline-none transition-colors" placeholder="..." />
            </div>
          </div>
        </section>

        {/* --- Sección 2: Carga de Requisitos --- */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl">📄</span>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Proceso de carga de Requisitos de Documentacion</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {/* Input de archivo genérico */}
            <FileUpload label="INE del Fallecido (De los dos lados)" />
            <FileUpload label="INE del Declarante (De los dos lados)" isRequired note="(Quien realiza el tramite)" />
            <FileUpload label="Certificado de Defunción" isRequired />
            
            <FileUpload label="Acta de Defunción" isRequired />
            <FileUpload label="Orden de Inhumacion" isRequired />
            <FileUpload label="Recibo Coop. Semana Santa" icon="🚩" />
            
            <FileUpload label="Recibo de Agua Potable" icon="💧" />
            <FileUpload label="Recibo Coop. Pirotecnia" icon="🎆" />
            <FileUpload label="Recibo Coop. Fiestas Patronales" icon="🚩" />
            
            <FileUpload label="Recibo Coop. extras (opcional)" icon="🚩" />
          </div>
        </section>

        {/* Botones de acción */}
        <div className="flex justify-between items-center mt-16 pt-6 border-t border-gray-100">
          <button className="flex items-center gap-2 text-gray-600 font-bold text-sm hover:text-black transition-colors">
            <span>‹</span> Atras
          </button>
          <button className="bg-[#C0392B] text-white px-10 py-3 rounded-xl font-bold hover:bg-[#A93226] shadow-md transition-all active:scale-95">
            Guardar y Continuar
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#C0392B] text-white py-6 px-10 text-[10px]">
        <div className="max-w-6xl mx-auto flex justify-between items-center opacity-90">
          <p>Gobierno Municipal – Administración 2024–2027</p>
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

// Componente auxiliar para los inputs de archivos
const FileUpload: React.FC<{ label: string; isRequired?: boolean; note?: string; icon?: string }> = ({ label, isRequired, note, icon }) => (
  <div className="space-y-3">
    <label className="block text-[11px] font-bold text-gray-700 leading-tight">
      {icon && <span className="mr-1">{icon}</span>}
      {label} {isRequired && <span className="text-red-600 text-[9px] ml-1">Obligatorio</span>}
      {note && <span className="text-red-600 text-[9px] block font-normal">{note}</span>}
    </label>
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded p-1">
      <label className="bg-gray-200 hover:bg-gray-300 text-[10px] font-bold px-3 py-1 rounded cursor-pointer transition-colors border border-gray-300">
        Examinar...
        <input type="file" className="hidden" />
      </label>
      <span className="text-[10px] text-gray-400 truncate">Ningún ar... seleccionado.</span>
    </div>
  </div>
);

export default RegistroTramite;