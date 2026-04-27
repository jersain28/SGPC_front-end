import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModuloReportes: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. Estados para los filtros
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('Todos');
  const [loading, setLoading] = useState(false);

  // 2. Función para descargar el Excel
  const handleGenerarReporte = async () => {
    setLoading(true);
    const token = localStorage.getItem('access_token');
    
    // Construimos los parámetros de búsqueda
    const params = new URLSearchParams();
    if (fechaInicio) params.append('fecha_inicio', fechaInicio);
    if (fechaFin) params.append('fecha_fin', fechaFin);
    if (estado !== 'Todos') params.append('status', estado);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reportes/excel/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Convertimos la respuesta en un archivo descargable (Blob)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Reporte_Panteon_${new Date().toISOString().slice(0,10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Error al generar el reporte. Verifica los rangos de fechas.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button onClick={() => navigate('/admin/dashboard')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Principal</button>
          <button onClick={() => navigate('/admin/solicitudes')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Solicitudes</button>
          <button onClick={() => navigate('/admin/registrar-trabajador')} className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-red-600">Nuevo Trabajador</button>
          <button className="text-sm font-bold border-r-4 border-red-600 py-2 px-6 text-left text-red-600">Reportes</button>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Panel Administrativo</h1>
            <p className="text-[10px] font-black text-gray-400 tracking-[0.2em]">Comunidad Nativitas</p>
          </div>
          <button onClick={() => { localStorage.clear(); navigate('/admin'); }} className="bg-gray-100 text-red-600 border border-gray-200 px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200">
            Cerrar Sesión
          </button>
        </header>

        <h2 className="text-2xl font-normal text-gray-800 mb-8">Módulo de Reportes</h2>

        <div className="space-y-12 max-w-5xl">
          <section className="bg-white border border-gray-300 rounded-[2rem] p-10 shadow-sm relative">
            <h3 className="absolute top-6 left-10 text-sm font-bold text-gray-800">Filtro de Reportes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-800 text-center">Fecha de Inicio</label>
                <input 
                  type="date" 
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full border border-gray-400 rounded-xl p-2 h-10 px-4 focus:ring-2 focus:ring-red-500 outline-none" 
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-800 text-center">Fecha de Fin</label>
                <input 
                  type="date" 
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full border border-gray-400 rounded-xl p-2 h-10 px-4 focus:ring-2 focus:ring-red-500 outline-none" 
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-800 text-center">Estado del Trámite</label>
                <select 
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full border border-gray-400 rounded-xl p-2 h-10 px-4 bg-white text-xs"
                >
                  <option value="Todos">Todos</option>
                  <option value="Aprobado">Aprobado</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-300 rounded-[2rem] p-10 shadow-sm text-center">
            <h3 className="text-sm font-bold text-gray-800 mb-6">Exportar Reporte</h3>
            <p className="text-xs font-medium text-gray-800 mb-10 italic">
              Se generará un archivo Excel con los trámites filtrados.
            </p>
            
            <div className="flex justify-center">
              <button 
                onClick={handleGenerarReporte}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-12 rounded shadow-md transition-all text-xs uppercase disabled:opacity-50"
              >
                {loading ? 'Generando...' : 'GENERAR REPORTE EXCEL (.XLSX)'}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ModuloReportes;