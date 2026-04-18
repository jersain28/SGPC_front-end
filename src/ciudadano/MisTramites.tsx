import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MisTramites: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. ESTADOS DINÁMICOS PARA EL USUARIO
  const [userName, setUserName] = useState<string>('Usuario');
  const [initials, setInitials] = useState<string>('U');

  useEffect(() => {
    // Recuperamos la info guardada en el LoginUser.tsx corregido
    const savedName = localStorage.getItem('user_full_name');
    const savedInitials = localStorage.getItem('user_initials');
    
    if (savedName && savedName !== 'undefined') {
      setUserName(savedName);
      // Si no hay iniciales guardadas, las generamos del nombre
      setInitials(savedInitials || savedName.charAt(0).toUpperCase());
    }
  }, []);

  // 2. FUNCIÓN PARA CERRAR SESIÓN (Lógica de limpieza)
  const handleLogout = () => {
    localStorage.clear(); // Limpia token, nombre e iniciales
    navigate('/login');   // Redirige al portal de acceso
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* --- Navbar Superior --- */}
      <nav className="bg-[#C0392B] text-white px-8 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">🏛️</div>
          <div>
            <h1 className="font-bold text-sm leading-tight uppercase tracking-tight">Comunidad de Nativitas</h1>
            <p className="text-[10px] opacity-80 uppercase tracking-tighter">Sistema de Gestión del Panteón</p>
          </div>
        </div>
        
        {/* PERFIL DINÁMICO Y CERRAR SESIÓN ESTILIZADO */}
        <div className="flex items-center gap-4">
          {/* Contenedor del nombre e iniciales */}
          <div className="flex items-center gap-3 bg-white/10 pl-4 pr-2 py-1 rounded-full border border-white/20 shadow-sm">
            <div className="text-right">
              <p className="text-[11px] font-black leading-none">{userName}</p>
              <p className="text-[9px] opacity-70 uppercase font-medium mt-1">Portal Ciudadano</p>
            </div>
            <div className="w-8 h-8 bg-[#C0392B] rounded-full flex items-center justify-center text-xs font-black border border-white/40 shadow-md">
              {initials}
            </div>
          </div>

          {/* Botón de Salir con diseño profesional */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-[#C0392B] px-3 py-2 rounded-xl font-black text-[9px] uppercase tracking-tighter hover:bg-gray-100 transition-all active:scale-95 shadow-lg group border-none"
            title="Finalizar Sesión"
          >
            <span className="text-xs group-hover:rotate-12 transition-transform">🚪</span>
            <span>Cerrar Sesion</span>
          </button>
        </div>
      </nav>

      {/* --- Sub-Header --- */}
      <div className="bg-white px-8 py-2 border-b flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span className="hover:text-[#C0392B] cursor-pointer transition-colors">Portal Ciudadano</span>
          <span className="text-[#C0392B] border-b-2 border-[#C0392B] pb-1">Mis Trámites</span>
        </div>
        
        <button 
          onClick={() => navigate('/registroTramite')}
          className="bg-white border border-[#C0392B] text-[#C0392B] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-[#C0392B] hover:text-white transition-all shadow-sm active:scale-95"
        >
          + Nuevo Trámite
        </button>
      </div>

      {/* --- Contenido Principal --- */}
      <main className="p-8 max-w-5xl mx-auto w-full space-y-6">
        
        {/* Alerta de Acción Requerida */}
        <div className="bg-red-50 border-l-4 border-[#C0392B] rounded-r-xl p-4 flex gap-4 items-center shadow-sm">
          <div className="text-[#C0392B] text-xl animate-pulse">⚠️</div>
          <div>
            <h4 className="text-[#C0392B] font-black text-xs uppercase">Acción Requerida</h4>
            <p className="text-[11px] text-gray-600">El administrador detectó errores en tu documentación. Por favor, realiza las correcciones indicadas.</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 items-center text-[10px] font-bold">
          <span className="text-gray-400 uppercase mr-2">Filtrar:</span>
          <button className="bg-[#C0392B] text-white px-4 py-1.5 rounded-full shadow-md">Todos</button>
          <button className="bg-white border px-4 py-1.5 rounded-full text-gray-600 hover:border-[#C0392B] transition-all">Acción requerida (1)</button>
          <button className="bg-white border px-4 py-1.5 rounded-full text-gray-600 hover:border-[#C0392B] transition-all">En proceso</button>
        </div>

        {/* Tarjeta de Trámite */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-[#C0392B] text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            ⚠️ Atención: 2 documentos rechazados.
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-xl text-gray-800 tracking-tighter">CN-2026-0021</h3>
                  <span className="text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-black uppercase">Rechazado</span>
                </div>
                <p className="text-[11px] text-gray-500 uppercase font-bold">
                  Fallecido: <span className="text-gray-800">Laura Martínez Pérez</span> 
                  <span className="mx-2 text-gray-300">|</span> 
                  Solicitado: 06 MAR 2026
                </p>
              </div>
              <div className="flex gap-2">
                <StatusCount count={3} label="LISTO" color="text-green-600" bg="bg-green-50" />
                <StatusCount count={2} label="ERROR" color="text-red-600" bg="bg-red-50" />
              </div>
            </div>

            {/* Stepper dinámico */}
            <div className="flex justify-between items-center mb-10 px-8 relative">
                <div className="absolute top-3 left-16 right-16 h-[2px] bg-gray-100 -z-0"></div>
                <Step label="Enviado" active completed />
                <Step label="Revisión" active completed />
                <Step label="Corrección" active error />
                <Step label="Aprobado" />
            </div>

            {/* Listado de Documentación */}
            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-inner bg-gray-50/30">
               <div className="bg-gray-100/50 px-4 py-2 border-b flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
                 <span>Documentación Adjunta</span>
                 <span className="cursor-pointer hover:text-gray-600">Ocultar 🔼</span>
               </div>
               <div className="divide-y divide-gray-100">
                  <DocRow name="INE del Fallecido" status="APROBADO" isRequired />
                  <DocRow 
                    name="INE del Declarante" 
                    status="RECHAZADO" 
                    isRequired 
                    errorMsg="La imagen está borrosa. Sube una foto nítida de ambos lados."
                  />
                  <DocRow 
                    name="Acta de Defunción" 
                    status="RECHAZADO" 
                    isRequired 
                    errorMsg="El documento debe ser del año vigente (2026)."
                  />
               </div>
            </div>

            {/* BOTÓN DE ACCIÓN PRINCIPAL */}
            <button 
              onClick={() => navigate('/registroTramite')}
              className="w-full mt-6 bg-[#C0392B] text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-red-800 transition-all shadow-lg active:scale-[0.98]"
            >
              <span className="text-lg">📤</span> Corregir y reenviar trámite
            </button>
          </div>
        </div>
      </main>

      {/* Footer Institucional */}
      <footer className="bg-[#C0392B] text-white py-8 px-10 text-[9px] mt-auto border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 opacity-80">
          <div className="text-center md:text-left">
            <p className="font-bold uppercase tracking-widest mb-1">Comunidad Nativitas © 2026</p>
            <p>Gobierno Municipal de Nativitas – Administración 2024–2027</p>
          </div>
          <div className="flex gap-6 font-black uppercase tracking-tighter">
            <button className="hover:underline">Privacidad</button>
            <button className="hover:underline">Soporte</button>
            {/* Botón secundario de salida en footer */}
            <button onClick={handleLogout} className="hover:underline text-white/90">Cerrar Sesión</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Subcomponentes de apoyo ---

const StatusCount = ({ count, label, color, bg }: any) => (
  <div className={`${bg} ${color} rounded-xl p-2 text-center min-w-[65px] border border-current/10 shadow-sm`}>
    <div className="text-xl font-black leading-none">{count}</div>
    <div className="text-[7px] font-black uppercase tracking-tighter">{label}</div>
  </div>
);

const Step = ({ label, active, completed, error }: any) => (
  <div className="flex flex-col items-center flex-1 z-10">
    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-sm transition-all
      ${completed ? 'bg-green-500 border-green-500 text-white' : 
        error ? 'bg-red-600 border-red-600 text-white animate-pulse' : 
        active ? 'border-[#C0392B] bg-white text-[#C0392B]' : 'border-gray-200 bg-white text-gray-300'}`}>
      {completed ? '✓' : error ? '!' : '●'}
    </div>
    <span className={`text-[8px] mt-2 font-black uppercase tracking-tight ${error ? 'text-red-600' : active ? 'text-gray-700' : 'text-gray-300'}`}>{label}</span>
  </div>
);

const DocRow = ({ name, status, isRequired, errorMsg }: any) => (
  <div className="p-4 bg-white/50 hover:bg-white transition-colors">
    <div className="flex justify-between items-center mb-1">
      <div className="flex items-center gap-3">
        <span className="text-sm">📄</span>
        <span className="text-[11px] font-bold text-gray-700">{name} {isRequired && <span className="text-[8px] text-red-500 ml-1">● REQUERIDO</span>}</span>
      </div>
      <span className={`text-[8px] font-black px-2 py-1 rounded-md border uppercase tracking-widest
        ${status === 'APROBADO' ? 'bg-green-50 text-green-600 border-green-200' : 
          status === 'RECHAZADO' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
        {status}
      </span>
    </div>
    {errorMsg && (
      <div className="ml-7 mt-2 bg-red-50/50 p-2.5 rounded-lg border border-red-100/50">
        <p className="text-[10px] text-red-800 leading-tight"><span className="font-black uppercase text-[8px] mr-1">Nota del Admin:</span> {errorMsg}</p>
      </div>
    )}
  </div>
);

export default MisTramites;