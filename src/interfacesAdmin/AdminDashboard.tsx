import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import React from 'react';

// Tipado para los datos de la tabla
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

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Sidebar Lateral */}
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button className="text-sm font-bold border-r-4 border-panteon-red py-2 px-6 text-left">Principal</button>
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-panteon-red">Solicitudes</button>
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-panteon-red">Reportes</button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8">
        
        {/* Header del Panel */}
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel Administrativo</h1>
            <p className="text-xs font-bold text-gray-600">Comunidad Nativitas</p>
          </div>
          <button className="flex items-center gap-2 bg-gray-100 text-panteon-red border border-gray-200 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
            Cerrar Sesión
          </button>
        </header>

        {/* Cards de Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white border border-gray-800 rounded-2xl p-6 flex flex-col justify-between h-40 shadow-sm">
            <div className="flex justify-between">
              <FileText className="text-blue-500" size={32} />
              <span className="text-5xl font-light text-gray-700">5</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase">Total de solicitudes</p>
              <p className="text-[10px] text-gray-500">Registradas este mes</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-800 rounded-2xl p-6 flex flex-col justify-between h-40 shadow-sm">
            <div className="flex justify-end">
              <span className="text-5xl font-light text-orange-400">3</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase">Pendientes de Revisar</p>
              <p className="text-[10px] text-orange-500 flex items-center gap-1 font-bold">
                <AlertTriangle size={12} /> Requiere Atención
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-800 rounded-2xl p-6 flex flex-col justify-between h-40 shadow-sm">
            <div className="flex justify-end">
              <span className="text-5xl font-light text-green-400">1</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase">Permisos Liberados</p>
              <p className="text-[10px] text-green-500 flex items-center gap-1 font-bold">
                <CheckCircle size={12} /> Completados
              </p>
            </div>
          </div>
        </section>

        {/* Tabla de Solicitudes */}
        <section>
          <h2 className="text-2xl font-normal text-gray-800 mb-6">Solicitudes Recientes</h2>
          <div className="bg-white border border-gray-300 rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-900 border-b border-gray-100">
                  <th className="px-6 py-4 font-bold text-sm">Folio</th>
                  <th className="px-6 py-4 font-bold text-sm">Finado</th>
                  <th className="px-6 py-4 font-bold text-sm">Declarante</th>
                  <th className="px-6 py-4 font-bold text-sm">Fecha</th>
                  <th className="px-6 py-4 font-bold text-sm">Estado</th>
                  <th className="px-6 py-4 font-bold text-sm">Accion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {solicitudes.map((s, index) => (
                  <tr key={index} className="text-xs text-gray-700">
                    <td className="px-6 py-4 font-medium">{s.folio}</td>
                    <td className="px-6 py-4 font-medium">{s.finado}</td>
                    <td className="px-6 py-4 font-medium">{s.declarante}</td>
                    <td className="px-6 py-4 font-medium">{s.fecha}</td>
                    <td className={`px-6 py-4 font-bold ${s.estado === 'Aprobado' ? 'text-green-500' : 'text-orange-400'}`}>
                      {s.estado}
                    </td>
                    <td className="px-6 py-4">
                      <button className="border border-gray-300 px-6 py-1 rounded-full text-gray-800 font-bold hover:bg-gray-50 transition-all">
                        Revisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;