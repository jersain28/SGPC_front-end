import { ArrowLeft, CheckCircle, FileText, XCircle } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface TramiteDetalle {
  id: number;
  folio: string;
  nombre_finado: string;
  nombre_declarante: string;
  parentesco: string;
  telefono_declarante: string;
  email_declarante: string;
  status: string;
  [key: string]: any;
}

interface DocumentoInfo {
  id: string;
  nombre: string;
}

const documentosObligatorios: DocumentoInfo[] = [
  { id: 'ine_fallecido', nombre: 'INE del Fallecido' },
  { id: 'ine_declarante', nombre: 'INE del Declarante' },
  { id: 'cert_defuncion', nombre: 'Certificado de Defunción' },
  { id: 'acta_defuncion', nombre: 'Acta de Defunción' },
  { id: 'orden_inhumacion', nombre: 'Orden de Inhumación' },
];

const documentosComplementarios: DocumentoInfo[] = [
  { id: 'recibo_semana_santa', nombre: 'Recibo Coop. Semana Santa' },
  { id: 'recibo_agua', nombre: 'Recibo de Agua Potable' },
  { id: 'recibo_pirotecnia', nombre: 'Recibo Coop. Pirotecnia' },
  { id: 'recibo_patronales', nombre: 'Recibo Coop. Fiestas Patronales' },
  { id: 'recibo_extras', nombre: 'Recibo Coop. Extras' },
];

const ValidacionDocumentos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [datos, setDatos] = useState<TramiteDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [urlVisor, setUrlVisor] = useState<string | null>(null);

  const token = localStorage.getItem('access_token');

  const swalConfig = {
    customClass: {
      confirmButton: 'bg-[#C0392B] text-white font-black px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-[#A93226] transition-all mx-6',
      cancelButton: 'bg-white border-2 border-gray-100 text-gray-400 font-black px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all mx-6',
      popup: 'rounded-[2.5rem] p-10 shadow-2xl border border-gray-100',
      title: 'text-2xl font-black text-gray-900 tracking-tighter',
      htmlContainer: 'text-gray-500 font-medium text-sm',
      input: 'rounded-xl border-gray-200 font-sans text-sm p-4'
    },
    buttonsStyling: false
  };

  const obtenerNombresCampos = (idDoc: string) => {
    let status = `status_${idDoc}`;
    let obs = `obs_${idDoc}`;
    if (idDoc === 'recibo_semana_santa') { status = 'status_recibo_ss'; obs = 'obs_recibo_ss'; }
    else if (idDoc === 'recibo_pirotecnia') { status = 'status_recibo_piro'; obs = 'obs_recibo_piro'; }
    else if (idDoc === 'recibo_patronales') { status = 'status_recibo_patronales'; obs = 'obs_recibo_patronales'; }
    else if (idDoc === 'recibo_agua') { status = 'status_recibo_agua'; obs = 'obs_recibo_agua'; }
    return { status, obs };
  };

  const fetchDetalle = async (silencioso = false) => {
    if (!silencioso) setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tramites/${id}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setDatos({ ...data });
      }
    } catch (error) { console.error("Error:", error); }
    finally { if (!silencioso) setLoading(false); }
  };

  useEffect(() => { if (id) fetchDetalle(); }, [id]);

  const gestionarValidacion = async (campo: string, nuevoStatus: string, motivo: string = "") => {
    if (!datos) return;
    const { status: campoStatus, obs: campoObs } = obtenerNombresCampos(campo);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tramites/${id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [campoStatus]: nuevoStatus,
          [campoObs]: motivo,
          status: 'PENDIENTE'
        })
      });
      if (response.ok) await fetchDetalle(true);
    } catch (error) { console.error("Error:", error); }
  };

  const solicitarMotivoRechazo = async (docId: string) => {
    const { value: motivo } = await MySwal.fire({
      title: 'Motivo de Rechazo',
      input: 'textarea',
      inputPlaceholder: 'Escriba la razón (ej. Documento ilegible)...',
      showCancelButton: true,
      confirmButtonText: 'Confirmar Rechazo',
      cancelButtonText: 'Cancelar',
      ...swalConfig
    });

    if (motivo) {
      gestionarValidacion(docId, 'RECHAZADO', motivo);
    }
  };

  const todosAprobados = useMemo(() => {
    if (!datos) return false;
    const listaTotal = [...documentosObligatorios, ...documentosComplementarios];
    return listaTotal.every(doc => {
      const urlDoc = datos[doc.id];
      const { status: keyStatus } = obtenerNombresCampos(doc.id);
      return !urlDoc || datos[keyStatus] === 'APROBADO';
    });
  }, [datos]);

  const finalizarTramite = async () => {
    const result = await MySwal.fire({
      title: '¿Confirmar Liberación?',
      text: "Se generará el permiso oficial y el trámite se marcará como aprobado.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, Generar Permiso',
      cancelButtonText: 'Revisar',
      ...swalConfig
    });

    if (!result.isConfirmed) return;

    MySwal.fire({ title: 'Generando...', allowOutsideClick: false, didOpen: () => MySwal.showLoading(), ...swalConfig });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tramites/${datos?.id}/finalizar/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const res = await response.json();
        await MySwal.fire({ title: '¡Éxito!', text: 'Permiso generado.', icon: 'success', ...swalConfig });
        window.open(res.url, '_blank');
        navigate('/admin/dashboard');
      }
    } catch (e) { MySwal.fire({ title: 'Error', icon: 'error', ...swalConfig }); }
  };

  const FilaDocumento: React.FC<{ doc: DocumentoInfo }> = ({ doc }) => {
    const urlDoc = datos?.[doc.id];
    const { status: keyStatus } = obtenerNombresCampos(doc.id);
    const statusDoc = datos?.[keyStatus];

    return (
      <div className={`border-t border-gray-100 py-4 transition-all duration-300 ${
        statusDoc === 'APROBADO' ? 'bg-green-50 border-l-4 border-green-500' :
        statusDoc === 'RECHAZADO' ? 'bg-red-50 border-l-4 border-red-500' : ''
      }`}>
        <div className="flex justify-between items-center px-4">
          <div className="flex flex-col">
            <span className="font-black text-[11px] text-gray-800 ">{doc.nombre}</span>
            {statusDoc === 'APROBADO' && <span className="text-[8px] text-green-600 font-bold italic">Validado ✅</span>}
          </div>
          <div className="flex gap-3 items-center">
            {urlDoc ? (
              <>
                <button onClick={() => setUrlVisor(urlDoc)} className="text-blue-600 font-black text-[10px] hover:underline">Ver PDF</button>
                <div className="flex gap-2 bg-white p-1 rounded-full shadow-sm border border-gray-100">
                  <button
                    onClick={() => gestionarValidacion(doc.id, 'APROBADO')}
                    className={`p-2 rounded-full transition-all ${statusDoc === 'APROBADO' ? 'bg-green-600 text-white shadow-md' : 'text-gray-300 hover:text-green-500'}`}
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => solicitarMotivoRechazo(doc.id)}
                    className={`p-2 rounded-full transition-all ${statusDoc === 'RECHAZADO' ? 'bg-red-600 text-white shadow-md' : 'text-gray-300 hover:text-red-500'}`}
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              </>
            ) : <span className="text-gray-300 text-[10px] font-black italic">No cargado</span>}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="p-20 text-center font-black text-gray-400 tracking-widest">Cargando...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <aside className="w-48 bg-white border-r border-gray-200 flex flex-col pt-10">
        <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-[10px] font-black text-gray-400 py-2 px-6 hover:text-red-600 tracking-widest transition-colors">
          <ArrowLeft size={14} /> Volver
        </button>
      </aside>

      <main className="flex-1 p-10">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Validación de Expediente</h1>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest mt-2 underline decoration-red-600 underline-offset-4 uppercase">
              FOLIO: {datos?.folio}
            </p>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest shadow-sm ${datos?.status === 'APROBADO' ? 'bg-green-500 text-white' : 'bg-orange-400 text-white'}`}>
              {datos?.status}
            </div>
          </div>
        </header>

        <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 mb-10 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-6 text-[10px] font-black italic">
          <div><p className="text-gray-400 mb-1">Finado</p><p className="text-gray-800">{datos?.nombre_finado}</p></div>
          <div><p className="text-gray-400 mb-1">Declarante</p><p className="text-gray-800">{datos?.nombre_declarante}</p></div>
          <div><p className="text-gray-400 mb-1">Parentesco</p><p className="text-gray-800">{datos?.parentesco}</p></div>
          <div><p className="text-gray-400 mb-1">Teléfono</p><p className="text-gray-800">{datos?.telefono_declarante}</p></div>
          <div><p className="text-gray-400 mb-1">Correo</p><p className="text-gray-800 truncate">{datos?.email_declarante}</p></div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <section className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-sm h-[750px] flex flex-col">
            <div className="flex-1 border border-gray-50 rounded-[2rem] bg-gray-100 overflow-hidden relative shadow-inner">
              {urlVisor ? <iframe src={`${urlVisor}#toolbar=0`} className="w-full h-full border-none" title="Visor" /> : (
                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                  <FileText size={64} className="mb-4 opacity-10" />
                  <p className="text-[10px] font-black tracking-widest">Seleccione un archivo</p>
                </div>
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-[11px] font-black text-gray-900 mb-6 border-l-4 border-red-600 pl-4 tracking-tight uppercase">Requisitos Obligatorios</h3>
              {documentosObligatorios.map(doc => <FilaDocumento key={doc.id} doc={doc} />)}
            </div>
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="text-[11px] font-black text-gray-900 mb-6 border-l-4 border-slate-300 pl-4 tracking-tight uppercase">Pagos y Cooperaciones</h3>
              {documentosComplementarios.map(doc => <FilaDocumento key={doc.id} doc={doc} />)}
            </div>
            <button
              disabled={!todosAprobados}
              onClick={finalizarTramite}
              className={`w-full font-black text-[11px] uppercase tracking-widest py-6 rounded-2xl transition-all duration-300 ${
                todosAprobados ? 'bg-[#C0392B] text-white shadow-xl hover:-translate-y-1' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Finalizar y Generar Permiso Oficial
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ValidacionDocumentos;