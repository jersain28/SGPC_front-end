import React from 'react';

const ModuloReportes: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Sidebar - Sección "Reportes" activa */}
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left">Principal</button>
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left">Solicitudes</button>
          <button className="text-sm font-bold border-r-4 border-panteon-red py-2 px-6 text-left text-panteon-red">Reportes</button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel Administrativo</h1>
            <p className="text-[10px] font-bold text-gray-600">Comunidad Nativitas</p>
          </div>
          <button className="bg-gray-100 text-panteon-red border border-gray-200 px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">
            Cerrar Sesión
          </button>
        </header>

        <h2 className="text-2xl font-normal text-gray-800 mb-8">Modulo de Reportes</h2>

        <div className="space-y-12 max-w-5xl">
          
          {/* Card 1: Filtro de Reportes */}
          <section className="bg-white border border-gray-300 rounded-[2rem] p-10 shadow-sm relative">
            <h3 className="absolute top-6 left-10 text-sm font-bold text-gray-800">Filtro de Reportes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-800 text-center">Fecha de Inicio</label>
                <input type="date" className="w-full border border-gray-400 rounded-xl p-2 h-10 px-4 focus:outline-none" />
              </div>
              
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-800 text-center">Fecha de Fin</label>
                <input type="date" className="w-full border border-gray-400 rounded-xl p-2 h-10 px-4 focus:outline-none" />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-800 text-center">Estado del Tramite</label>
                <select className="w-full border border-gray-400 rounded-xl p-2 h-10 px-4 bg-white text-xs">
                  <option>Todos</option>
                  <option>Aprobado</option>
                  <option>Pendiente</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <button className="bg-panteon-red hover:bg-red-800 text-white font-bold py-2.5 px-16 rounded shadow-md transition-all text-xs">
                Aplicar Filtros
              </button>
            </div>
          </section>

          {/* Card 2: Exportar Reporte */}
          <section className="bg-white border border-gray-300 rounded-[2rem] p-10 shadow-sm text-center">
            <h3 className="text-sm font-bold text-gray-800 mb-6">Exportar Reporte</h3>
            <p className="text-xs font-medium text-gray-800 mb-10">
              El reporte incluirá todos los registros del período seleccionado con todos los campos del sistema.
            </p>
            
            <div className="flex justify-center">
              <button className="bg-panteon-red hover:bg-red-800 text-white font-bold py-3 px-12 rounded shadow-md transition-all text-xs uppercase tracking-tight">
                GENERAR REPORTE EXCEL (.XLSX)
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default ModuloReportes;