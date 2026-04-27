import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // 1. IMPORTANTE: Importar SweetAlert2
import { supabase } from '../supabaseClient';

// Definición de tipos para TypeScript
interface FormData {
  nombre_finado: string;
  fecha_nacimiento: string;
  nombre_declarante: string;
  parentesco: string;
  email_declarante: string;
  telefono_declarante: string;
}

const RegistroTramite: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nombre_finado: '',
    fecha_nacimiento: '',
    nombre_declarante: '',
    parentesco: '',
    email_declarante: '',
    telefono_declarante: ''
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  const cleanFileName = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (label: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [label]: file }));
  };

  const handleSubmit = async () => {
    // 2. CORRECCIÓN: Validación con SweetAlert2
    if (!formData.nombre_finado || !formData.nombre_declarante) {
      Swal.fire({
        title: 'CAMPOS INCOMPLETOS',
        text: 'Por favor, completa los campos del finado y declarante.',
        icon: 'warning',
        confirmButtonColor: '#C0392B'
      });
      return;
    }

    const documentosObligatorios = [
      "ine_fallecido",
      "ine_declarante",
      "certificado_defuncion",
      "acta_defuncion",
      "orden_inhumacion"
    ];

    const faltantes = documentosObligatorios.filter(key => !files[key]);
    if (faltantes.length > 0) {
      Swal.fire({
        title: 'FALTAN DOCUMENTOS',
        text: 'Debes cargar los 5 archivos obligatorios.',
        icon: 'error',
        confirmButtonColor: '#1A1A1A'
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Subida a Supabase
      const uploadPromises = Object.entries(files).map(async ([label, file]) => {
        if (!file) return null;

        const sanitizedFolder = cleanFileName(formData.nombre_finado.trim());
        const sanitizedFileName = cleanFileName(file.name);
        const filePath = `${sanitizedFolder}/${Date.now()}_${sanitizedFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('requisitos-panteon')
          .upload(filePath, file);

        if (uploadError) throw new Error(`Error en la subida de ${label}`);

        const { data: urlData } = supabase.storage.from('requisitos-panteon').getPublicUrl(filePath);

        return { label, url: urlData.publicUrl };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      // 2. CORRECCIÓN: Mapeo de campos según tu modelo de Django
      const payload: any = { ...formData };
      const mapaCampos: { [key: string]: string } = {
        "ine_fallecido": "ine_fallecido",
        "ine_declarante": "ine_declarante",
        "certificado_defuncion": "cert_defuncion",
        "acta_defuncion": "acta_defuncion",
        "orden_inhumacion": "orden_inhumacion",
        "coop_semana_santa": "recibo_semana_santa",
        "recibo_agua": "recibo_agua",
        "coop_pirotecnia": "recibo_pirotecnia",
        "coop_fiestas_patronales": "recibo_patronales",
        "coop_extras": "recibo_extras"
      };

      uploadedFiles.forEach(file => {
        if (file && mapaCampos[file.label]) {
          payload[mapaCampos[file.label]] = file.url;
        }
      });

      // 3. Envío al Backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tramites/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setLoading(false);
        // 3. CORRECCIÓN: Alerta de éxito personalizada
        Swal.fire({
          title: '¡EXPEDIENTE REGISTRADO!',
          text: 'El trámite se ha enviado correctamente a la Administracion.',
          icon: 'success',
          confirmButtonText: 'ENTENDIDO',
          confirmButtonColor: '#C0392B',
          customClass: {
            title: 'font-black text-2xl uppercase tracking-tighter',
            popup: 'rounded-2xl border border-gray-100',
            confirmButton: 'px-10 py-3 rounded-xl font-black text-[11px] tracking-[0.2em]'
          }
        }).then(() => {
          navigate('/MisTramites');
        });
      } else {
        throw new Error("Error en el registro de la base de datos.");
      }

    } catch (error: any) {
      setLoading(false);
      Swal.fire({
        title: 'Hubo un error',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#1A1A1A'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white py-6 px-10 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div className="flex flex-col">
              <h2 className="text-[#C0392B] font-bold text-lg tracking-wider leading-tight">
                Comunidad de Nativitas
              </h2>
              <p className="text-[9px] text-gray-500 font-bold tracking-wider uppercase">
                Sistema de Gestión de Panteón
              </p>
            </div>
          </div>

          <span className="text-[10px] font-black text-gray-400 tracking-[0.2em]">
            Expediente Digital
          </span>
        </div>
      </nav>

      <main className="flex-grow p-8 max-w-6xl mx-auto w-full bg-white my-8 shadow-xl rounded-2xl border border-gray-100">
        <div className="text-center mb-12 border-b pb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter">Registro de Trámite</h1>
          <p className="text-gray-400 text-[10px] font-bold tracking-widest italic">SGPC - Gestión de Panteón</p>
        </div>

        <section className="mb-14 bg-gray-50/40 p-8 rounded-2xl border border-dashed border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InputField label="Nombre del Finado" name="nombre_finado" value={formData.nombre_finado} onChange={handleInputChange} />
            <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleInputChange} />
            <InputField label="Nombre del Declarante" name="nombre_declarante" value={formData.nombre_declarante} onChange={handleInputChange} />

            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-1">Parentesco</label>
              <select name="parentesco" value={formData.parentesco} onChange={handleInputChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-[#C0392B] outline-none bg-transparent font-bold text-sm">
                <option value="Seleccionar">Seleccionar</option>
                <option value="Conyuge">Cónyuge</option>
                <option value="Hijo/a">Hijo/a</option>
                <option value="Padre/Madre">Padre / Madre</option>
                <option value="Hermano/a">Hermano/a</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <InputField label="Email de Contacto" name="email_declarante" type="email" value={formData.email_declarante} onChange={handleInputChange} />
            <InputField label="Teléfono" name="telefono_declarante" type="tel" value={formData.telefono_declarante} onChange={handleInputChange} />
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-black text-[#C0392B] tracking-[0.15em] mb-10">Documentación y Recibos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileUpload label="INE del Fallecido" onFileSelect={(file) => handleFileChange("ine_fallecido", file)} isRequired />
            <FileUpload label="INE del Declarante" onFileSelect={(file) => handleFileChange("ine_declarante", file)} isRequired />
            <FileUpload label="Certificado Defunción" onFileSelect={(file) => handleFileChange("certificado_defuncion", file)} isRequired />
            <FileUpload label="Acta de Defunción" onFileSelect={(file) => handleFileChange("acta_defuncion", file)} isRequired />
            <FileUpload label="Orden Inhumación" onFileSelect={(file) => handleFileChange("orden_inhumacion", file)} isRequired />

            <FileUpload label="Recibo Semana Santa" onFileSelect={(file) => handleFileChange("coop_semana_santa", file)} />
            <FileUpload label="Recibo Agua Potable" onFileSelect={(file) => handleFileChange("recibo_agua", file)} />
            <FileUpload label="Recibo Pirotecnia" onFileSelect={(file) => handleFileChange("coop_pirotecnia", file)} />
            <FileUpload label="Fiestas Patronales" onFileSelect={(file) => handleFileChange("coop_fiestas_patronales", file)} />
            <FileUpload label="Recibo Coop. Extras" onFileSelect={(file) => handleFileChange("coop_extras", file)} note="Opcional" />
          </div>
        </section>

        <div className="flex justify-between items-center mt-20 pt-10 border-t border-gray-100">
          <button onClick={() => navigate(-1)} className="text-gray-400 font-black text-[10px] hover:text-black transition-all">← Volver</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#C0392B] text-white px-14 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] shadow-xl hover:bg-red-800 disabled:opacity-50 transition-all active:scale-95"
          >
            {loading ? "Sincronizando..." : "Enviar Expediente"}
          </button>
        </div>
      </main>
    </div>
  );
};

// Componentes Auxiliares
const InputField = ({ label, name, type = "text", value, onChange }: any) => (
  <div className="group">
    <label className="block text-[10px] font-black text-gray-400 mb-1 group-focus-within:text-[#C0392B] transition-colors">{label}</label>
    <input name={name} type={type} value={value} onChange={onChange} className="w-full border-b-2 border-gray-100 py-2 focus:border-[#C0392B] outline-none font-bold text-sm transition-all bg-transparent" required />
  </div>
);

const FileUpload = ({ label, isRequired, onFileSelect, note }: {
  label: string;
  isRequired?: boolean;
  onFileSelect: (file: File | null) => void;
  note?: string
}) => {
  const [fileName, setFileName] = useState("Sin archivo");
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <label className="block text-[10px] font-black text-gray-800 mb-1">{label} {isRequired && "*"}</label>
      {note && <p className="text-[8px] text-gray-400 mb-2 font-medium">{note}</p>}
      <label className="bg-gray-50 text-[#C0392B] text-[9px] font-black px-4 py-2.5 rounded-xl cursor-pointer border border-transparent hover:border-[#C0392B]/20 text-center block transition-all">
        Elegir PDF
        <input type="file" className="hidden" accept="application/pdf" onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setFileName(file ? file.name : "Sin archivo");
          onFileSelect(file);
        }} />
      </label>
      <span className="text-[8px] text-gray-400 block mt-2 text-center italic truncate">{fileName}</span>
    </div>
  );
};

export default RegistroTramite;