import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Interfaz actualizada para incluir 'Finalizado'
interface Solicitud {
  id: number;
  folio: string;
  nombre_finado: string;
  nombre_declarante: string;
  fecha_creacion: string;
  status: 'Aprobado' | 'Pendiente' | 'Finalizado'; // Agregamos Finalizado
}

const GestionSolicitudes: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tramites/`, {
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
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Panel Administrativo</h1>
            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em]">Comunidad Nativitas</p>
          </div>
          <button onClick={() => { localStorage.clear(); navigate('/admin'); }} className="bg-gray-100 text-red-600 border border-gray-200 px-6 py-2 rounded-full text-[10px] font-black  tracking-widest hover:bg-gray-200 transition-all">
            Cerrar Sesión
          </button>
        </header>

        <h2 className="text-2xl font-normal text-gray-800 mb-8 mt-12">Gestión de Solicitudes</h2>

        {/* Contenedor de la Tabla - Cambiamos border-blue-500 por algo más tenue o el gris de tu diseño */}
        <div className="border border-gray-200 rounded-[2rem] bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <p className="text-[10px] font-black text-gray-400  tracking-widest animate-pulse">Sincronizando con Nativitas...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-gray-50 ">
                  <th className="px-8 py-6 font-black text-[10px] tracking-widest">Folio</th>
                  <th className="px-8 py-6 font-black text-[10px] tracking-widest">Finado</th>
                  <th className="px-8 py-6 font-black text-[10px] tracking-widest">Declarante</th>
                  <th className="px-8 py-6 font-black text-[10px] tracking-widest">Estado</th>
                  <th className="px-8 py-6 font-black text-[10px] tracking-widest">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {solicitudes.length > 0 ? solicitudes.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm text-gray-500">{s.folio}</td>
                    <td className="px-8 py-5 font-bold text-sm text-gray-900 ">{s.nombre_finado}</td>
                    <td className="px-8 py-5 font-bold text-xs text-gray-500">{s.nombre_declarante}</td>

                    {/* ESTADO CON COLOR DINÁMICO CORREGIDO */}
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-black  tracking-widest ${s.status?.toUpperCase() === 'FINALIZADO' || s.status?.toUpperCase() === 'APROBADO'
                          ? 'text-green-500'
                          : 'text-orange-500'
                        }`}>
                        {s.status}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <button
                        onClick={() => navigate(`/admin/validacionDocumentos/${s.id}`)}
                        className="border border-gray-200 px-6 py-2 rounded-xl text-[10px] font-black tracking-widest hover:bg-black hover:text-white transition-all"
                      >
                        Revisar
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                      No hay solicitudes registradas por el momento.
                    </td>
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