import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CorregirTramite: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tramite, setTramite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [nuevosArchivos, setNuevosArchivos] = useState<{ [key: string]: File }>({});
  const [enviando, setEnviando] = useState(false);

  const estructuraDocumentos = [
    { id: 'ine_fallecido', nombre: 'INE del Fallecido', statusKey: 'status_ine_fallecido', obsKey: 'obs_ine_fallecido' },
    { id: 'ine_declarante', nombre: 'INE del Declarante', statusKey: 'status_ine_declarante', obsKey: 'obs_ine_declarante' },
    { id: 'cert_defuncion', nombre: 'Certificado de Defunción', statusKey: 'status_cert_defuncion', obsKey: 'obs_cert_defuncion' },
    { id: 'acta_defuncion', nombre: 'Acta de Defunción', statusKey: 'status_acta_defuncion', obsKey: 'obs_acta_defuncion' },
    { id: 'orden_inhumacion', nombre: 'Orden de Inhumación', statusKey: 'status_orden_inhumacion', obsKey: 'obs_orden_inhumacion' },
    { id: 'recibo_ss', nombre: 'Recibo Coop. Semana Santa', statusKey: 'status_recibo_ss', obsKey: 'obs_recibo_ss' },
    { id: 'recibo_piro', nombre: 'Recibo Coop. Pirotecnia', statusKey: 'status_recibo_piro', obsKey: 'obs_recibo_piro' },
    { id: 'recibo_agua', nombre: 'Recibo de Agua Potable', statusKey: 'status_recibo_agua', obsKey: 'obs_recibo_agua' },
    { id: 'recibo_patronales', nombre: 'Recibo Coop. Fiestas Patronales', statusKey: 'status_recibo_patronales', obsKey: 'obs_recibo_patronales' },
    { id: 'recibo_extras', nombre: 'Recibo Coop. Extras', statusKey: 'status_recibo_extras', obsKey: 'obs_recibo_extras' },
  ];

  useEffect(() => {
    const fetchTramite = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/mis-tramites/`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
        });
        const data = await response.json();
        const actual = data.find((t: any) => t.id === parseInt(id || '0'));
        setTramite(actual);
      } catch (error) {
        console.error("Error al cargar trámite:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTramite();
  }, [id]);

  const handleFileChange = (docId: string, file: File) => {
    setNuevosArchivos(prev => ({ ...prev, [docId]: file }));
  };

  const handleSubmit = async () => {
    if (Object.keys(nuevosArchivos).length === 0) {
      alert("Por favor, selecciona al menos un archivo corregido.");
      return;
    }

    setEnviando(true);
    const formData = new FormData();
    
    // Agregamos solo los archivos que el usuario seleccionó para corregir
    Object.keys(nuevosArchivos).forEach(key => {
      formData.append(key, nuevosArchivos[key]);
    });

    try {
      const response = await fetch(`http://localhost:8000/api/tramites/${id}/corregir/`, {
        method: 'POST', // Usamos POST para envío de archivos
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          // Nota: El navegador pone el Content-Type automáticamente al ser FormData
        },
        body: formData
      });

      if (response.ok) {
        alert("¡Correcciones enviadas! Tu expediente ha regresado a revisión.");
        navigate('/misTramites');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'No se pudo procesar la corrección.'}`);
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  if (loading) return <div className="p-10 text-center uppercase font-black text-[10px]">Cargando expediente...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 text-[10px] font-black uppercase text-gray-400 hover:text-gray-600 transition-colors">← Volver</button>
        
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 tracking-tighter mb-2 italic">CORREGIR EXPEDIENTE</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-10">Folio: {tramite?.folio}</p>

          <div className="space-y-6">
            {estructuraDocumentos.map(doc => {
              // SOLO MOSTRAR LOS RECHAZADOS SEGÚN EL STATUS DEL BACKEND
              if (tramite[doc.statusKey] !== 'RECHAZADO') return null;

              return (
                <div key={doc.id} className="p-6 bg-red-50 rounded-[1.5rem] border border-red-100">
                  <label className="block text-[11px] font-black text-red-700 uppercase mb-1">{doc.nombre}</label>
                  <p className="text-[10px] text-red-500 mb-4 bg-white/70 p-3 rounded-xl italic border border-red-100">
                    <span className="font-black not-italic mr-1">MOTIVO DE RECHAZO:</span> 
                    {tramite[doc.obsKey] || 'Documento no válido o ilegible.'}
                  </p>
                  
                  <input 
                    type="file" 
                    onChange={(e) => e.target.files && handleFileChange(doc.id, e.target.files[0])}
                    className="block w-full text-[10px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#C0392B] file:text-white hover:file:bg-red-700 cursor-pointer"
                  />
                  
                  {nuevosArchivos[doc.id] && (
                    <p className="mt-3 text-[9px] font-black text-green-600 uppercase flex items-center">
                      <span className="mr-1">✓</span> {nuevosArchivos[doc.id].name} listo para subir
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={enviando}
            className={`w-full mt-10 text-white py-5 rounded-[1.5rem] font-black uppercase text-[11px] tracking-widest transition-all shadow-xl ${
              enviando ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black hover:scale-[1.02]'
            }`}
          >
            {enviando ? 'Enviando correcciones...' : 'Enviar correcciones para revisión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorregirTramite;