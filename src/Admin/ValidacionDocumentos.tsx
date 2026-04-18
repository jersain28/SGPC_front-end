import { ArrowLeft, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 1. Tipados corregidos para coincidir con el Serializer de Django
interface DocumentoRelacionado {
  tipo_documento: string;
  archivo_url: string;
}

interface TramiteDetalle {
  id: number;
  folio: string;
  nombre_finado: string;
  nombre_declarante: string;
  parentesco: string;
  telefono_declarante: string;
  email_declarante: string;
  status: string;
  documentos: DocumentoRelacionado[]; // Ahora es una lista, como en el backend
}

interface DocumentoInfo {
  id: string;
  nombre: string;
  obligatorio?: boolean;
}

const documentosObligatorios: DocumentoInfo[] = [
  { id: 'ine_fallecido', nombre: 'INE del Fallecido', obligatorio: true },
  { id: 'ine_declarante', nombre: 'INE del Declarante', obligatorio: true },
  { id: 'acta_defuncion', nombre: 'Acta de Defunción', obligatorio: true },
  { id: 'certificado_defuncion', nombre: 'Certificado de Defunción', obligatorio: true },
  { id: 'orden_inhumacion', nombre: 'Orden de Inhumación', obligatorio: true },
];

const documentosComplementarios: DocumentoInfo[] = [
  { id: 'coop_semana_santa', nombre: 'Recibo Coop. Semana Santa' },
  { id: 'recibo_agua', nombre: 'Recibo de Agua Potable' },
  { id: 'coop_fiestas_patronales', nombre: 'Recibo Coop. Fiestas Patronales' },
  { id: 'coop_pirotecnia', nombre: 'Recibo Coop. Pirotecnia' },
  { id: 'coop_extras  ', nombre: 'Recibo Coop. Extras' },
];

const ValidacionDocumentos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [datos, setDatos] = useState<TramiteDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [urlVisor, setUrlVisor] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`http://localhost:8000/api/admin/tramites/${id}/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setDatos(data);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetalle();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-bold text-gray-400">Cargando documentación...</div>;
  if (!datos) return <div className="p-20 text-center font-bold text-red-500">Error: Trámite no encontrado.</div>;

  // 2. Componente de Fila corregido para buscar en el Array
  const FilaDocumento: React.FC<{ doc: DocumentoInfo }> = ({ doc }) => {
    // Buscamos el documento en la lista que nos mandó Django
    const docEncontrado = datos.documentos?.find(d => d.tipo_documento === doc.id);
    const urlDoc = docEncontrado?.archivo_url;

    return (
      <div className="border-t border-gray-100 py-4 flex justify-between items-center text-xs">
        <div className="flex-grow">
          <span className="font-bold text-gray-800">{doc.nombre}</span>
          {doc.obligatorio && <span className="text-[10px] text-red-600 font-bold ml-1 uppercase">REQ</span>}
        </div>
        <div className="flex gap-4 text-gray-700 font-bold">
          {urlDoc ? (
            <>
              <button 
                onClick={() => setUrlVisor(urlDoc)} 
                className="text-blue-600 hover:underline"
              >
                Ver
              </button>
              <button className="hover:text-green-600">Aprobar</button>
              <button className="hover:text-red-600">Rechazar</button>
            </>
          ) : (
            <span className="text-gray-400 italic font-normal">No cargado</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10">
        <nav className="flex flex-col space-y-8">
          <button 
            onClick={() => navigate('/admin/dashboard')} 
            className="flex items-center gap-2 text-sm font-bold text-gray-700 py-2 px-6 hover:text-red-600"
          >
            <ArrowLeft size={16} /> Volver
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <header className="mb-10">
          <h1 className="text-xl font-bold text-gray-900">Validación de Documentación</h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Folio: {datos.folio}
          </p>
        </header>

        {/* Sección de Datos Generales */}
        <section className="bg-white border border-gray-200 rounded-[2rem] p-8 mb-10 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-6 text-center text-[10px] font-bold">
          <div><p className="text-gray-400 uppercase mb-1">Fallecido</p><p className="text-gray-800">{datos.nombre_finado}</p></div>
          <div><p className="text-gray-400 uppercase mb-1">Declarante</p><p className="text-gray-800">{datos.nombre_declarante}</p></div>
          <div><p className="text-gray-400 uppercase mb-1">Parentesco</p><p className="text-gray-800">{datos.parentesco}</p></div>
          <div><p className="text-gray-400 uppercase mb-1">Teléfono</p><p className="text-gray-800">{datos.telefono_declarante}</p></div>
          <div><p className="text-gray-400 uppercase mb-1">Correo</p><p className="text-gray-800">{datos.email_declarante}</p></div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Visor de Documentos */}
          <section className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm h-[650px] flex flex-col">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-6">Vista Previa</h3>
            <div className="flex-1 border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden relative">
              {urlVisor ? (
                <iframe 
                  src={`${urlVisor}#toolbar=0`} 
                  className="w-full h-full border-none" 
                  title="Visor"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <FileText size={48} className="mb-4 opacity-20" />
                  <p className="text-xs font-bold">Seleccione un documento para visualizar</p>
                </div>
              )}
            </div>
          </section>

          {/* Listado de Documentos */}
          <section className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Obligatorios</h3>
              {documentosObligatorios.map(doc => <FilaDocumento key={doc.id} doc={doc} />)}
            </div>

            <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Complementarios</h3>
              {documentosComplementarios.map(doc => <FilaDocumento key={doc.id} doc={doc} />)}
            </div>

            <div className="bg-white border border-gray-300 rounded-[2rem] p-8 shadow-sm flex flex-col items-center">
              <span className="mb-4 px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-orange-100 text-orange-600">
                Estado: {datos.status}
              </span>
              <button 
                disabled={datos.status === 'Aprobado'}
                className="w-full bg-red-600 text-white font-bold text-xs py-4 rounded-full shadow-lg hover:bg-red-700 transition-all disabled:opacity-50"
              >
                Liberar Permiso de Uso de Panteón
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ValidacionDocumentos;