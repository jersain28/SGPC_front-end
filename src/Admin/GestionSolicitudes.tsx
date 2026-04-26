import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Interfaz sincronizada con tu modelo de Django
interface Solicitud {
  id: number;
  folio: string;
  nombre_finado: string;
  nombre_declarante: string;
  fecha_creacion: string; // O el campo de fecha que uses en el backend
  status: 'Aprobado' | 'Pendiente';
}

const GestionSolicitudes: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para obtener los datos de Django
  useEffect(() => {
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/api/admin/tramites/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setSolicitudes(data);
        } else {
          console.error("Error al obtener solicitudes");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button onClick={() => navigate('/admin/dashboard')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Principal</button>
          <button className="text-sm font-bold border-r-4 border-red-600 py-2 px-6 text-left text-red-600">Solicitudes</button>
          <button onClick={() => navigate('/admin/registrar-trabajador')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Nuevo Trabajador</button>
          <button onClick={() => navigate('/admin/moduloReportes')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Reportes</button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8">
        
        <header className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Panel Administrativo</h1>
            <p className="text-[10px] font-bold text-gray-600">Comunidad Nativitas</p>
          </div>
          <button onClick={() => { localStorage.clear(); navigate('/admin'); }} className="bg-gray-100 text-red-600 border border-gray-200 px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">
            Cerrar Sesión
          </button>
        </header>

        <h2 className="text-2xl font-normal text-gray-800 mb-8 mt-12">Gestión de Solicitudes</h2>

        <div className="border-2 border-blue-500 rounded-[2rem] p-4 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-10 text-center text-gray-500 font-bold">Cargando trámites...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-900">
                  <th className="px-6 py-6 font-bold text-sm">Folio</th>
                  <th className="px-6 py-6 font-bold text-sm">Finado</th>
                  <th className="px-6 py-6 font-bold text-sm">Declarante</th>
                  <th className="px-6 py-6 font-bold text-sm">Estado</th>
                  <th className="px-6 py-6 font-bold text-sm">Acción</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.length > 0 ? solicitudes.map((s) => (
                  <tr key={s.id} className="text-xs text-gray-800 border-t border-gray-100">
                    <td className="px-6 py-5 font-medium">{s.folio}</td>
                    <td className="px-6 py-5 font-medium">{s.nombre_finado}</td>
                    <td className="px-6 py-5 font-medium">{s.nombre_declarante}</td>
                    <td className={`px-6 py-5 font-bold ${s.status === 'Aprobado' ? 'text-green-500' : 'text-orange-400'}`}>
                      {s.status}
                    </td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={() => navigate(`/admin/validacionDocumentos/${s.id}`)}
                        className="border border-gray-300 px-8 py-1.5 rounded-full text-gray-800 font-bold hover:bg-gray-800 hover:text-white transition-all"
                      >
                        Revisar
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-gray-400 italic">No hay solicitudes registradas por el momento.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default GestionSolicitudes;