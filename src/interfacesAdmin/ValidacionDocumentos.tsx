import React from 'react';

// Tipado para un documento
interface Documento {
  id: string;
  nombre: string;
  obligatorio?: boolean;
}

// Datos de ejemplo para los documentos
const documentosObligatorios: Documento[] = [
  { id: 'ine_fallecido', nombre: 'INE del Fallecido', obligatorio: true },
  { id: 'ine_declarante', nombre: 'INE del Declarante', obligatorio: true },
  { id: 'acta_defuncion', nombre: 'Acta de Defunción', obligatorio: true },
  { id: 'certificado_defuncion', nombre: 'Certificado de Defunción', obligatorio: true },
  { id: 'orden_inhumacion', nombre: 'Orden de Inhumación', obligatorio: true },
];

const documentosComplementarios: Documento[] = [
  { id: 'recibo_semana_santa', nombre: 'Recibo Coop. Semana Santa' },
  { id: 'recibo_agua_potable', nombre: 'Recibo de Agua Potable' },
  { id: 'recibo_fiestas_patronales', nombre: 'Recibo Coop. Fiestas Patronales' },
  { id: 'recibo_pirotecnia', nombre: 'Recibo Coop. Pirotecnia' },
  { id: 'recibo_extras', nombre: 'Recibo Coop. Extras' },
];

// Componente para una fila de documento con sus acciones
const FilaDocumento: React.FC<{ doc: Documento }> = ({ doc }) => {
  return (
    <div className="border-t border-gray-100 py-4 flex justify-between items-center text-xs">
      <div className="flex-grow">
        <span className="font-bold text-gray-800">{doc.nombre}</span>
        {doc.obligatorio && (
          <span className="text-[10px] text-panteon-red font-bold ml-1 uppercase">REQ</span>
        )}
      </div>
      <div className="flex gap-4 text-gray-700 font-bold">
        <button className="hover:text-blue-600">Ver</button>
        <button className="hover:text-green-600">Aprobar</button>
        <button className="hover:text-red-600">Rechazar</button>
      </div>
    </div>
  );
};

const ValidacionDocumentos: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* Sidebar - Sección "Solicitudes" activa */}
      <aside className="w-48 bg-white border-r border-gray-300 flex flex-col pt-10 flex-shrink-0">
        <nav className="flex flex-col space-y-8">
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-panteon-red">Principal</button>
          <button className="text-sm font-bold border-r-4 border-panteon-red py-2 px-6 text-left text-panteon-red">Solicitudes</button>
          <button className="text-sm font-bold text-gray-700 py-2 px-6 text-left hover:text-panteon-red">Reportes</button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-10">
        
        {/* Header con Cerrar Sesión */}
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Panel Administrativo</h1>
            <p className="text-[10px] font-bold text-gray-600">Comunidad Nativitas</p>
          </div>
          <button className="bg-gray-100 text-panteon-red border border-gray-200 px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">
            Cerrar Sesión
          </button>
        </header>

        {/* Título de la sección */}
        <h2 className="text-2xl font-normal text-gray-800 mb-8">Validacion de Documentacion</h2>

        {/* Datos Generales */}
        <section className="bg-white border border-gray-300 rounded-[2rem] p-8 mb-10 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-6 text-center text-xs">
          <div className="space-y-1">
            <p className="font-bold text-gray-900">Fallecido</p>
            <p className="text-gray-800 font-medium">Laura Martinez Perez</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-900">Declarante</p>
            <p className="text-gray-800 font-medium">Jorge Martinez Lopez</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-900">Parentesco</p>
            <p className="text-gray-800 font-medium">Hijo</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-900">Telefono</p>
            <p className="text-gray-800 font-medium">246-123-45-12</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-900">Correo</p>
            <p className="text-gray-800 font-medium">jorgemartinez@gmail.com</p>
          </div>
        </section>

        {/* Layout de Dos Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Columna Izquierda: Vista Previa */}
          <section className="bg-white border border-gray-300 rounded-[2rem] p-8 shadow-sm flex flex-col h-[600px]">
            <h3 className="text-sm font-bold text-gray-800 mb-10">Vista Previa de Documentos</h3>
            <div className="flex-1 border border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-gray-50">
              <p className="text-sm font-bold text-gray-800 mb-1">Ningun Documento seleccionado</p>
              <p className="text-[10px] text-gray-500 font-medium">Presione "Ver" en cualquier documento de la lista</p>
            </div>
          </section>

          {/* Columna Derecha: Listado de Documentos */}
          <section className="space-y-10">
            
            {/* Documentos Obligatorios */}
            <div className="bg-white border border-gray-300 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-6">Documentos Obligatorios</h3>
              <div className="space-y-0.5">
                {documentosObligatorios.map(doc => (
                  <FilaDocumento key={doc.id} doc={doc} />
                ))}
              </div>
            </div>

            {/* Documentos Complementarios */}
            <div className="bg-white border border-gray-300 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-6">Documentos Complementarios</h3>
              <div className="space-y-0.5">
                {documentosComplementarios.map(doc => (
                  <FilaDocumento key={doc.id} doc={doc} />
                ))}
              </div>
            </div>

            {/* Estado y Botón de Liberación */}
            <div className="bg-white border border-gray-300 rounded-[2rem] p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 border-t-4 border-panteon-red mb-3"></div>
              <p className="text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Pendiente</p>
              <p className="text-[10px] text-gray-600 mb-8 max-w-xs">Aprueba todos los documentos obligatorios para habilitar la liberación del permiso.</p>
              <button className="border-2 border-panteon-red text-panteon-red font-bold text-[10px] py-2 px-10 rounded-full hover:bg-red-50 transition-all active:scale-95">
                Liberar Permiso de Uso de Panteon
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default ValidacionDocumentos;