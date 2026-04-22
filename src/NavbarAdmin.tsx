import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  showAccessButtons?: boolean;
  userName?: string;
}

const NavbarAdmin: React.FC<NavbarProps> = () => {
  return (
    <nav className="bg-white py-4 px-10 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Nombre - Al hacer clic regresa al Home */}
        <Link to="/admin" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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

      </div>
    </nav>
  );
};

export default NavbarAdmin;