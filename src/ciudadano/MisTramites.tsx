import { CheckCircle, Download, ExternalLink, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Interfaz actualizada con el nombre real del campo en Django
interface Tramite {
  id: number;
  folio: string;
  nombre_finado: string;
  status: string;
  creado_el: string;
  pdf_permiso?: string; // Sincronizado con models.py
  [key: string]: any;
}

const MisTramites: React.FC = () => {
  const navigate = useNavigate();
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('Usuario');
  const [initials, setInitials] = useState<string>('U');

  const estructuraDocumentos = [
    { id: 'ine_fallecido', nombre: 'INE del Fallecido', statusKey: 'status_ine_fallecido', obsKey: 'obs_ine_fallecido' },
    { id: 'ine_declarante', nombre: 'INE del Declarante', statusKey: 'status_ine_declarante', obsKey: 'obs_ine_declarante' },
    { id: 'cert_defuncion', nombre: 'Certificado de Defunción', statusKey: 'status_cert_defuncion', obsKey: 'obs_cert_defuncion' },
    { id: 'acta_defuncion', nombre: 'Acta de Defunción', statusKey: 'status_acta_defuncion', obsKey: 'obs_acta_defuncion' },
    { id: 'orden_inhumacion', nombre: 'Orden de Inhumación', statusKey: 'status_orden_inhumacion', obsKey: 'obs_orden_inhumacion' },
    { id: 'recibo_semana_santa', nombre: 'Recibo Coop. Semana Santa', statusKey: 'status_recibo_ss', obsKey: 'obs_recibo_ss' },
    { id: 'recibo_pirotecnia', nombre: 'Recibo Coop. Pirotecnia', statusKey: 'status_recibo_piro', obsKey: 'obs_recibo_piro' },
    { id: 'recibo_agua', nombre: 'Recibo de Agua Potable', statusKey: 'status_recibo_agua', obsKey: 'obs_recibo_agua' },
    { id: 'recibo_patronales', nombre: 'Recibo Coop. Fiestas Patronales', statusKey: 'status_recibo_patronales', obsKey: 'obs_recibo_patronales' },
    { id: 'recibo_extras', nombre: 'Recibo Coop. Extras', statusKey: 'status_recibo_extras', obsKey: 'obs_recibo_extras' },
  ];

  useEffect(() => {
    const savedName = localStorage.getItem('user_full_name');
    const savedInitials = localStorage.getItem('user_initials');
    if (savedName) {
      setUserName(savedName);
      setInitials(savedInitials || savedName.charAt(0).toUpperCase());
    }

    const fetchTramites = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/api/mis-tramites/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setTramites(data);
        }
      } catch (error) {
        console.error("Error cargando trámites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTramites();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-gray-400 font-black text-xs uppercase animate-pulse tracking-widest">
        Sincronizando con Presidencia...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <nav className="bg-[#C0392B] text-white px-8 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-white/20 p-2 rounded-lg">🏛️</div>
          <div>
            <h1 className="font-bold text-sm leading-tight uppercase tracking-tight">Comunidad de Nativitas</h1>
            <p className="text-[10px] opacity-80 uppercase tracking-tighter">Gestión de Panteón</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/10 pl-4 pr-2 py-1 rounded-full border border-white/20">
            <div className="text-right">
              <p className="text-[11px] font-black leading-none">{userName}</p>
              <p className="text-[9px] opacity-70 uppercase font-medium mt-1">Portal Ciudadano</p>
            </div>
            <div className="w-8 h-8 bg-[#C0392B] rounded-full flex items-center justify-center text-xs font-black border border-white/40">
              {initials}
            </div>
          </div>
          <button onClick={handleLogout} className="bg-white text-[#C0392B] px-3 py-2 rounded-xl font-black text-[9px] uppercase hover:bg-gray-100 transition-all shadow-lg">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="bg-white px-8 py-2 border-b flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span className="text-[#C0392B] border-b-2 border-[#C0392B] pb-1">Mis Trámites</span>
        </div>
        <button
          onClick={() => navigate('/registroTramite')}
          className="bg-white border border-[#C0392B] text-[#C0392B] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase hover:bg-[#C0392B] hover:text-white transition-all"
        >
          + Nuevo Trámite
        </button>
      </div>

      <main className="p-8 max-w-5xl mx-auto w-full space-y-8">
        {tramites.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] border-2 border-dashed border-gray-200 text-center">
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">No tienes trámites registrados</p>
          </div>
        ) : (
          tramites.map((tramite) => {
            const tieneDocumentosRechazados = estructuraDocumentos.some(
              doc => tramite[doc.statusKey] === 'RECHAZADO'
            );
            
            const necesitaAccion = tramite.status === 'RECHAZADO' || tieneDocumentosRechazados;

            return (
              <div key={tramite.id} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-200 overflow-hidden">
                {necesitaAccion && (
                  <div className="bg-[#C0392B] text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="animate-bounce">⚠️</span> Acción Requerida: Se han rechazado documentos. Por favor, corrígelos.
                  </div>
                )}

                <div className="p-8">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-2xl text-gray-800 tracking-tighter">{tramite.folio}</h3>
                        <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest 
                          ${necesitaAccion ? 'bg-red-100 text-red-600' :
                            tramite.status === 'APROBADO' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {necesitaAccion ? 'Requiere Corrección' : 
                            tramite.status === 'PENDIENTE' ? 'En Revisión' : tramite.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 uppercase font-bold tracking-tight">
                        Fallecido: <span className="text-gray-900">{tramite.nombre_finado}</span>
                        <span className="mx-3 text-gray-200">|</span>
                        Fecha: {new Date(tramite.creado_el).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-100 rounded-3xl overflow-hidden bg-gray-50/50">
                    <div className="divide-y divide-gray-100">
                      {estructuraDocumentos.map((doc) => {
                        const urlArchivo = tramite[doc.id];
                        const estadoArchivo = urlArchivo ? tramite[doc.statusKey] : 'NO_DISPONIBLE';
                        const observacion = tramite[doc.obsKey];

                        return (
                          <DocRow
                            key={doc.id}
                            name={doc.nombre}
                            status={estadoArchivo}
                            errorMsg={observacion}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. SECCIÓN DEL PERMISO FINAL ACTUALIZADA */}
                  {tramite.pdf_permiso && (
                    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] border border-gray-700 shadow-2xl relative group overflow-hidden transition-all duration-500">
                      <div className="absolute -right-4 -top-4 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                         <FileText size={100} />
                      </div>

                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-yellow-500 p-3 rounded-2xl shadow-lg">
                            <CheckCircle className="text-gray-900" size={24} />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Permiso Oficial Liberado</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Documento digital validado por el sistema.</p>
                          </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                          {/* Botón Ver Online */}
                          <a 
                            href={tramite.pdf_permiso} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none bg-gray-700 text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-gray-600 transition-all border border-gray-600 flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={14} />
                            Ver Online
                          </a>
                          {/* Botón Descargar */}
                          <a 
                            href={tramite.pdf_permiso} 
                            download={`Permiso_${tramite.folio}.pdf`}
                            className="flex-1 md:flex-none bg-white text-gray-900 px-8 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl flex items-center justify-center gap-2"
                          >
                            <Download size={14} />
                            Descargar PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {necesitaAccion && (
                    <button
                      onClick={() => navigate(`/corregir-tramite/${tramite.id}`)}
                      className="w-full mt-8 bg-[#C0392B] text-white font-black text-xs uppercase tracking-widest py-5 rounded-[1.5rem] shadow-2xl hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      <span>📤</span> Abrir editor de correcciones
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
};

const DocRow = ({ name, status, errorMsg }: any) => (
  <div className={`p-5 transition-colors ${status === 'RECHAZADO' ? 'bg-red-50/50' : 'hover:bg-white'}`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm
          ${status === 'APROBADO' ? 'bg-green-100' : 
            status === 'RECHAZADO' ? 'bg-red-100' : 
            status === 'NO_DISPONIBLE' ? 'bg-gray-50' : 'bg-gray-100'}`}>
          {status === 'APROBADO' ? '✅' : status === 'RECHAZADO' ? '❌' : '📄'}
        </div>
        <span className={`text-[11px] font-black uppercase tracking-tight ${status === 'NO_DISPONIBLE' ? 'text-gray-300' : 'text-gray-700'}`}>
          {name}
        </span>
      </div>
      <span className={`text-[8px] font-black px-3 py-1 rounded-lg border uppercase tracking-[0.1em]
        ${status === 'APROBADO' ? 'bg-green-100 text-green-700 border-green-200' :
          status === 'RECHAZADO' ? 'bg-red-100 text-red-700 border-red-200' : 
          'bg-gray-100 text-gray-400 border-gray-200'}`}>
        {status === 'NO_DISPONIBLE' ? 'Faltante' : status === 'PENDIENTE' ? 'En espera' : status}
      </span>
    </div>

    {status === 'RECHAZADO' && errorMsg && (
      <div className="ml-12 mt-3 bg-white p-3 rounded-xl border border-red-100 shadow-sm">
        <p className="text-[10px] text-red-800 leading-snug">
          <span className="font-black uppercase text-[8px] mr-2 text-red-600 underline">Nota del Admin:</span>
          {errorMsg}
        </p>
      </div>
    )}
  </div>
);

export default MisTramites;