import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const RegistroTramite: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // --- Estados para los campos de texto ---
  const [formData, setFormData] = useState({
    nombre_finado: '',
    fecha_nacimiento: '',
    nombre_declarante: '',
    parentesco: 'Conyuge',
    email_declarante: '',
    telefono_declarante: ''
  });

  // --- Estados para los archivos ---
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});

  // --- 1. FUNCIÓN DE LIMPIEZA (Evita el error "Invalid key" en Supabase) ---
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
    // --- 2. VALIDACIONES PREVIAS ---
    if (!formData.nombre_finado || !formData.nombre_declarante) {
      alert("Por favor, completa los campos obligatorios del finado y declarante.");
      return;
    }

    // Lista de documentos que son obligatorios para el trámite
    const documentosObligatorios = [
      "ine_fallecido", 
      "ine_declarante", 
      "certificado_defuncion", 
      "acta_defuncion", 
      "orden_inhumacion"
    ];

    const faltantes = documentosObligatorios.filter(key => !files[key]);
    if (faltantes.length > 0) {
      alert("Faltan documentos obligatorios por cargar (INEs, Acta, Certificado u Orden).");
      return;
    }

    setLoading(true);

    try {
      // --- 3. SUBIDA A SUPABASE ---
      const uploadPromises = Object.entries(files).map(async ([label, file]) => {
        if (!file) return null;

        const sanitizedFolder = cleanFileName(formData.nombre_finado.trim());
        const sanitizedFileName = cleanFileName(file.name);
        
        // Ruta: Nombre_Finado/Timestamp_NombreArchivo.pdf
        const filePath = `${sanitizedFolder}/${Date.now()}_${sanitizedFileName}`;

        const { error: uploadError } = await supabase.storage
          .from('requisitos-panteon')
          .upload(filePath, file);

        if (uploadError) {
          console.error(`Error al subir ${label}:`, uploadError);
          throw new Error(`Error en la subida de ${label}`);
        }

        const { data: urlData } = supabase.storage.from('requisitos-panteon').getPublicUrl(filePath);
        
        return { 
          tipo_documento: label, 
          archivo_url: urlData.publicUrl 
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const documentUrls = uploadedFiles.filter(f => f !== null);

      // --- 4. ENVÍO A DJANGO ---
      const response = await fetch('http://localhost:8000/api/tramites/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          ...formData,
          documentos: documentUrls 
        }),
      });

      // Manejo de respuesta para evitar el "SyntaxError: JSON.parse"
      if (response.ok) {
        alert("Trámite registrado y documentos subidos con éxito.");
        navigate('/MisTramites');
      } else {
        // Verificamos si la respuesta es JSON antes de intentar leerla
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Error de validación Django:", errorData);
          alert("Error en los datos: " + JSON.stringify(errorData));
        } else {
          // Si Django manda un error 404/500 en HTML
          const textError = await response.text();
          console.log("Error del servidor (HTML):", textError);
          alert("Error en el servidor. Verifica que la ruta /api/tramites/ exista en Django.");
        }
      }

    } catch (error: any) {
      console.error("Error general:", error);
      alert("Hubo un problema: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white py-6 px-10 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-[#C0392B] font-black text-xl uppercase tracking-widest">Comunidad de Nativitas</h2>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Expediente Digital</span>
        </div>
      </nav>

      <main className="flex-grow p-8 max-w-6xl mx-auto w-full bg-white my-8 shadow-xl rounded-2xl border border-gray-100">
        <div className="text-center mb-12 border-b pb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3 uppercase tracking-tighter">Registro de Trámite</h1>
          <p className="text-gray-500 text-sm font-medium">Carga de Documentación para Inhumación</p>
        </div>

        {/* Sección 1: Datos */}
        <section className="mb-14 bg-gray-50/40 p-8 rounded-2xl border border-dashed border-gray-200">
          <h3 className="text-[11px] font-black text-[#C0392B] mb-8 uppercase tracking-[0.15em] flex items-center gap-3">
            <span className="bg-[#C0392B] text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px] shadow-md">1</span>
            Información del Trámite
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InputField label="Nombre del Finado" name="nombre_finado" value={formData.nombre_finado} onChange={handleInputChange} />
            <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleInputChange} />
            <InputField label="Nombre del Declarante" name="nombre_declarante" value={formData.nombre_declarante} onChange={handleInputChange} />

            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-1 uppercase">Parentesco</label>
              <select name="parentesco" value={formData.parentesco} onChange={handleInputChange} className="w-full border-b-2 border-gray-200 py-2 focus:border-[#C0392B] outline-none bg-transparent font-bold text-sm text-gray-700">
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

        {/* Sección 2: Archivos */}
        <section>
          <div className="flex items-center gap-3 mb-10">
             <h3 className="text-[11px] font-black text-[#C0392B] uppercase tracking-[0.15em] flex items-center gap-3">
              <span className="bg-[#C0392B] text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px] shadow-md">2</span>
              Requisitos (Formato PDF)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileUpload label="INE del Fallecido" onFileSelect={(file) => handleFileChange("ine_fallecido", file)} isRequired />
            <FileUpload label="INE del Declarante" onFileSelect={(file) => handleFileChange("ine_declarante", file)} isRequired />
            <FileUpload label="Certificado de Defunción" onFileSelect={(file) => handleFileChange("certificado_defuncion", file)} isRequired />
            <FileUpload label="Acta de Defunción" onFileSelect={(file) => handleFileChange("acta_defuncion", file)} isRequired />
            <FileUpload label="Orden de Inhumación" onFileSelect={(file) => handleFileChange("orden_inhumacion", file)} isRequired />
            
            {/* Cooperaciones */}
            <FileUpload label="Recibo Semana Santa" onFileSelect={(file) => handleFileChange("coop_semana_santa", file)} />
            <FileUpload label="Recibo Agua Potable" onFileSelect={(file) => handleFileChange("recibo_agua", file)} />
            <FileUpload label="Recibo Pirotecnia" onFileSelect={(file) => handleFileChange("coop_pirotecnia", file)} />
            <FileUpload label="Fiestas Patronales" onFileSelect={(file) => handleFileChange("coop_fiestas_patronales", file)} />
            
            {/* Campo Extra Opcional */}
            <FileUpload 
              label="Recibo Coop. Extras" 
              onFileSelect={(file) => handleFileChange("coop_extras", file)} 
              note="Opcional" 
            />
          </div>
        </section>

        <div className="flex justify-between items-center mt-20 pt-10 border-t border-gray-100">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-[#C0392B] font-black text-[10px] uppercase tracking-widest">
            ← Volver
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#C0392B] text-white px-14 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] shadow-xl hover:bg-red-800 transition-all disabled:opacity-50"
          >
            {loading ? "Sincronizando..." : "Enviar Expediente"}
          </button>
        </div>
      </main>
    </div>
  );
};

// Componentes Auxiliares
const InputField: React.FC<{ label: string; name: string; type?: string; value: string; onChange: any }> = ({ label, name, type = "text", value, onChange }) => (
  <div className="group">
    <label className="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-tighter group-focus-within:text-[#C0392B]">{label}</label>
    <input name={name} type={type} value={value} onChange={onChange} className="w-full border-b-2 border-gray-100 py-2 focus:border-[#C0392B] outline-none font-bold text-gray-700 text-sm transition-all" required />
  </div>
);

const FileUpload: React.FC<{ label: string; isRequired?: boolean; onFileSelect: (file: File | null) => void; note?: string }> = ({ label, isRequired, onFileSelect, note }) => {
  const [fileName, setFileName] = useState("Sin archivo");

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
      <label className="block text-[10px] font-black text-gray-800 uppercase mb-1">
        {label} {isRequired && <span className="text-[#C0392B]">*</span>}
      </label>
      {note && <p className="text-[9px] text-gray-400 mb-3 font-medium">{note}</p>}
      <div className="flex flex-col gap-3">
        <label className="bg-gray-50 text-[#C0392B] text-[9px] font-black px-4 py-2.5 rounded-xl cursor-pointer border border-transparent group-hover:border-[#C0392B]/20 text-center transition-all uppercase tracking-widest">
          Elegir PDF
          <input type="file" className="hidden" accept="application/pdf" onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFileName(file ? file.name : "Sin archivo");
            onFileSelect(file);
          }} />
        </label>
        <span className="text-[9px] text-gray-400 truncate font-bold text-center italic">{fileName}</span>
      </div>
    </div>
  );
};

export default RegistroTramite;