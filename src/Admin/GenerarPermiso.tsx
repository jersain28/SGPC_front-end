import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GenerarPermiso: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const descargarPDF = async () => {
      const token = localStorage.getItem('access_token');
      try {
        // Petición al endpoint de Django definido en tu urls.py
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/tramites/${id}/generar-permiso/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Permiso_Oficial_Folio_${id}.pdf`;
          document.body.appendChild(link);
          link.click();
          link.remove();
          
          alert("Permiso generado exitosamente.");
          navigate('/admin/dashboard');
        } else {
          alert("Error al generar el documento.");
          navigate(-1); // Regresa si hay error
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (id) descargarPDF();
  }, [id, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C0392B] mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Generando documento oficial...</p>
    </div>
  );
};

export default GenerarPermiso;