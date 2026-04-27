import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Solicitud {
  id: number;
  folio: string;
  nombre_finado: string;
  nombre_declarante: string;
  status: string; // Lo tratamos como string para comparar flexiblemente
}

const AdminDashboard: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tramites/`, {
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

  // --- LÓGICA DE CONTEO DINÁMICO ---
  const total = solicitudes.length;
  
  const pendientes = solicitudes.filter(s => 
    s.status?.toUpperCase() === 'PENDIENTE'
  ).length;

  const liberados = solicitudes.filter(s => 
    s.status?.toUpperCase() === 'FINALIZADO' || s.status?.toUpperCase() === 'APROBADO'
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-48 bg-white border-r border-gray-200 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button className="text-sm font-bold border-r-4 border-[#C0392B] py-2 px-6 text-left text-[#C0392B]">Principal</button>
          <button onClick={() => navigate('/admin/solicitudes')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-[#C0392B]">Solicitudes</button>
          <button onClick={() => navigate('/admin/registrar-trabajador')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-[#C0392B]">Nuevo Trabajador</button>
          <button onClick={() => navigate('/admin/moduloreportes')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-[#C0392B]">Reportes</button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Panel Administrativo</h1>
            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em]">Comunidad Nativitas</p>
          </div>
          <button onClick={handleLogout} className="bg-gray-100 text-[#C0392B] border border-gray-200 px-6 py-2 rounded-full text-[10px] font-black tracking-widest hover:bg-gray-200 transition-all">
            Cerrar Sesión
          </button>
        </header>

        {/* STATS CARDS DINÁMICAS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between h-44 shadow-sm">
            <div className="flex justify-between items-start">
              <FileText className="text-blue-500" size={32} />
              <span className="text-6xl font-light text-gray-800 tracking-tighter">{total}</span>
            </div>
            <p className="text-[10px] font-black text-gray-400 tracking-widest">Total de solicitudes</p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between h-44 shadow-sm">
            <div className="flex justify-end">
              <span className="text-6xl font-light text-orange-400 tracking-tighter">{pendientes}</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 tracking-widest">Pendientes</p>
              <p className="text-[10px] text-orange-500 flex items-center gap-1 font-black tracking-tight">
                <AlertTriangle size={12} /> Requiere Atención
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between h-44 shadow-sm">
            <div className="flex justify-end">
              <span className="text-6xl font-light text-green-400 tracking-tighter">{liberados}</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 tracking-widest">Liberados</p>
              <p className="text-[10px] text-green-500 flex items-center gap-1 font-black tracking-tight">
                <CheckCircle size={12} /> Completados
              </p>
            </div>
          </div>
        </section>

        {/* TABLA CON COLORES DINÁMICOS */}
        <section>
          <h2 className="text-xl font-black text-gray-800 mb-6 tracking-tight">Solicitudes Recientes</h2>
          <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-20 text-center">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-[#C0392B] border-t-transparent rounded-full mb-4"></div>
                <p className="text-[10px] font-black text-gray-400 tracking-widest">Sincronizando expedientes...</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-50">
                    <th className="px-8 py-6 font-black text-[10px] tracking-widest">Folio</th>
                    <th className="px-8 py-6 font-black text-[10px] tracking-widest">Finado</th>
                    <th className="px-8 py-6 font-black text-[10px] tracking-widest">Declarante</th>
                    <th className="px-8 py-6 font-black text-[10px] tracking-widest">Estado</th>
                    <th className="px-8 py-6 font-black text-[10px] tracking-widest text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {solicitudes.length > 0 ? solicitudes.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 font-bold text-sm text-gray-500">{s.folio}</td>
                      <td className="px-8 py-5 font-bold text-sm text-gray-900">{s.nombre_finado}</td>
                      <td className="px-8 py-5 font-bold text-xs text-gray-500">{s.nombre_declarante}</td>
                      
                      {/* ESTADO CON COLOR DINÁMICO */}
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-black tracking-widest ${
                          s.status?.toUpperCase() === 'FINALIZADO' || s.status?.toUpperCase() === 'APROBADO'
                            ? 'text-green-500' 
                            : 'text-orange-500'
                        }`}>
                          {s.status}
                        </span>
                      </td>

                      <td className="px-8 py-5 text-center">
                        <button 
                          onClick={() => navigate(`/admin/validacionDocumentos/${s.id}`)}
                          className="border border-gray-200 px-6 py-2 rounded-xl text-[10px] font-black tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                          Revisar
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="p-20 text-center text-gray-400 text-[10px] font-black tracking-widest">No hay expedientes en el sistema</td></tr>
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