import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  showAccessButtons?: boolean;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ showAccessButtons = false, userName }) => {
  return (
    <nav className="bg-white py-4 px-10 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Nombre - Al hacer clic regresa al Home */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🏛️</span>
          <div>
            <h2 className="text-[#C0392B] font-bold text-lg uppercase tracking-wider leading-tight">
              Comunidad de Nativitas
            </h2>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
              Sistema de Gestión de Panteón
            </p>
          </div>
        </Link>

        {/* Condicional: Botones de acceso (Solo para el Home) */}
        {showAccessButtons ? (
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-gray-600 font-bold text-sm hover:text-[#C0392B] transition-colors">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="border-2 border-[#C0392B] text-[#C0392B] font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#C0392B] hover:text-white transition-all active:scale-95">
              Crear Cuenta
            </Link>
          </div>
        ) : (
          /* Si no es el Home, mostramos el perfil del usuario si existe */
          userName && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-gray-800">{userName}</p>
                <p className="text-[10px] text-[#C0392B] font-medium">Portal Ciudadano</p>
              </div>
              <div className="w-10 h-10 bg-[#C0392B] text-white rounded-full flex items-center justify-center font-bold shadow-md">
                {userName.substring(0, 2).toUpperCase()}
              </div>
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;