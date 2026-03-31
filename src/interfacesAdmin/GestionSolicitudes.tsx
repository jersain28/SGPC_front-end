import React from 'react';

// Reutilizamos la interfaz para los datos
interface Solicitud {
  folio: string;
  finado: string;
  declarante: string;
  fecha: string;
  estado: 'Aprobado' | 'Pendiente';
}

const solicitudes: Solicitud[] = [
  { folio: 'SVX-2025-0001', finado: 'Jose Ramirez Torres', declarante: 'Carlos Mendoza', fecha: '2025-03-06', estado: 'Aprobado' },
  { folio: 'SVX-2025-0002', finado: 'Lucía Mendoza Pérez', declarante: 'Rosa González', fecha: '2025-03-06', estado: 'Pendiente' },
  { folio: 'SVX-2025-0003', finado: 'Felipe González Castro', declarante: 'Jorge Vega', fecha: '2025-03-06', estado: 'Pendiente' },
  { folio: 'SVX-2025-0004', finado: 'Esperanza Vega Luna', declarante: 'Carlos Garcia', fecha: '2025-03-06', estado: 'Aprobado' },
];

const GestionSolicitudes: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Sidebar - Ahora con "Solicitudes" activo */}
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-panteon-red">Principal</button>
          <button className="text-sm font-bold border-r-4 border-panteon-red py-2 px-6 text-left text-panteon-red">Solicitudes</button>
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-panteon-red">Reportes</button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8">
        
        {/* Header idéntico */}
        <header className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Panel Administrativo</h1>
            <p className="text-[10px] font-bold text-gray-600">Comunidad Nativitas</p>
          </div>
          <button className="bg-gray-100 text-panteon-red border border-gray-200 px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">
            Cerrar Sesión
          </button>
        </header>

        {/* Título de la sección */}
        <h2 className="text-2xl font-normal text-gray-800 mb-8 mt-12">Gestion de Solicitudes</h2>

        {/* Tabla con el borde azul distintivo */}
        <div className="border-2 border-blue-500 rounded-[2rem] p-4 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-900">
                <th className="px-6 py-6 font-bold text-sm">Folio</th>
                <th className="px-6 py-6 font-bold text-sm">Finado</th>
                <th className="px-6 py-6 font-bold text-sm">Declarante</th>
                <th className="px-6 py-6 font-bold text-sm">Fecha</th>
                <th className="px-6 py-6 font-bold text-sm">Estado</th>
                <th className="px-6 py-6 font-bold text-sm">Accion</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s, index) => (
                <tr key={index} className="text-xs text-gray-800 border-t border-transparent">
                  <td className="px-6 py-5 font-medium">{s.folio}</td>
                  <td className="px-6 py-5 font-medium">{s.finado}</td>
                  <td className="px-6 py-5 font-medium">{s.declarante}</td>
                  <td className="px-6 py-5 font-medium">{s.fecha}</td>
                  <td className={`px-6 py-5 font-bold ${s.estado === 'Aprobado' ? 'text-green-500' : 'text-orange-400'}`}>
                    {s.estado}
                  </td>
                  <td className="px-6 py-5">
                    <button className="border border-gray-300 px-8 py-1.5 rounded-full text-gray-800 font-bold hover:bg-gray-50 transition-all">
                      Revisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GestionSolicitudes;