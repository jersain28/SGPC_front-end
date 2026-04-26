import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Interfaz corregida para coincidir con Django
interface Solicitud {
  id: number;
  folio: string;
  nombre_finado: string;      // Coincide con el backend
  nombre_declarante: string;  // Coincide con el backend
  status: 'Aprobado' | 'Pendiente'; // Coincide con el backend
}

const AdminDashboard: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}api/admin/tramites/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setSolicitudes(data);
        } else if (response.status === 401) {
          handleLogout();
        }
      } catch (error) {
        console.error("Error al cargar solicitudes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSolicitudes();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin'); 
  };

  // 2. Cálculos usando el campo 'status'
  const total = solicitudes.length;
  const pendientes = solicitudes.filter(s => s.status === 'Pendiente').length;
  const aprobados = solicitudes.filter(s => s.status === 'Aprobado').length;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button className="text-sm font-bold border-r-4 border-red-600 py-2 px-6 text-left text-red-600">Principal</button>
          <button onClick={() => navigate('/admin/solicitudes')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Solicitudes</button>
          <button onClick={() => navigate('/admin/registrar-trabajador')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Nuevo Trabajador</button>
          <button onClick={() => navigate('/admin/moduloreportes')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Reportes</button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel Administrativo</h1>
            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Comunidad Nativitas</p>
          </div>
          <button onClick={handleLogout} className="bg-gray-100 text-red-600 border border-gray-200 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
            Cerrar Sesión
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between h-40 shadow-sm">
            <div className="flex justify-between">
              <FileText className="text-blue-500" size={32} />
              <span className="text-5xl font-light text-gray-700">{total}</span>
            </div>
            <p className="text-[10px] font-bold uppercase text-gray-400">Total de solicitudes</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between h-40 shadow-sm">
            <div className="flex justify-end">
              <span className="text-5xl font-light text-orange-400">{pendientes}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400">Pendientes</p>
              <p className="text-[10px] text-orange-500 flex items-center gap-1 font-bold">
                <AlertTriangle size={12} /> Requiere Atención
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between h-40 shadow-sm">
            <div className="flex justify-end">
              <span className="text-5xl font-light text-green-400">{aprobados}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400">Liberados</p>
              <p className="text-[10px] text-green-500 flex items-center gap-1 font-bold">
                <CheckCircle size={12} /> Completados
              </p>
            </div>
          </div>
        </section>

        {/* Tabla Corregida */}
        <section>
          <h2 className="text-2xl font-normal text-gray-800 mb-6">Solicitudes Recientes</h2>
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            {loading ? (
              <p className="p-10 text-center text-gray-500 italic font-bold">Cargando trámites...</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-900 border-b border-gray-100">
                    <th className="px-6 py-4 font-bold text-sm">Folio</th>
                    <th className="px-6 py-4 font-bold text-sm">Finado</th>
                    <th className="px-6 py-4 font-bold text-sm">Declarante</th>
                    <th className="px-6 py-4 font-bold text-sm">Estado</th>
                    <th className="px-6 py-4 font-bold text-sm">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {solicitudes.length > 0 ? solicitudes.map((s) => (
                    <tr key={s.id} className="text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{s.folio}</td>
                      {/* CAMBIO: Usamos nombre_finado y nombre_declarante */}
                      <td className="px-6 py-4 font-medium">{s.nombre_finado}</td>
                      <td className="px-6 py-4 font-medium">{s.nombre_declarante}</td>
                      {/* CAMBIO: Usamos status */}
                      <td className={`px-6 py-4 font-bold ${s.status === 'Aprobado' ? 'text-green-500' : 'text-orange-400'}`}>
                        {s.status}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => navigate(`/admin/validacionDocumentos/${s.id}`)}
                          className="border border-gray-300 px-6 py-1 rounded-full text-gray-800 font-bold hover:bg-gray-800 hover:text-white transition-all"
                        >
                          Revisar
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="p-10 text-center text-gray-400">No hay solicitudes registradas.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;