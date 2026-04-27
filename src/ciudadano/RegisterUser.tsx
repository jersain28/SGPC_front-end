import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Navbar from '../Navbar';

const MySwal = withReactContent(Swal);

const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Configuración visual profesional heredada del SGPC
  const swalConfig = {
    customClass: {
      confirmButton: 'bg-[#C0392B] text-white font-black px-10 py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-[#A93226] transition-all mx-6',
      popup: 'rounded-[2.5rem] p-10 shadow-2xl border border-gray-100',
      title: 'text-2xl font-black text-gray-900 tracking-tighter',
      htmlContainer: 'text-gray-500 font-medium text-sm',
    },
    buttonsStyling: false
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Éxito con diseño profesional
        await MySwal.fire({
          title: '¡Registro Exitoso!',
          text: 'La cuenta ha sido creada correctamente en el sistema.',
          icon: 'success',
          confirmButtonText: 'Ir al Inicio de Sesión',
          ...swalConfig
        });
        navigate('/login');
      } else {
        // Error controlado desde Django
        MySwal.fire({
          title: 'No se pudo registrar',
          text: data.message || 'Verifique los datos e intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          ...swalConfig
        });
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error de Conexión',
        text: 'No se pudo establecer contacto con el servidor del SGPC.',
        icon: 'error',
        ...swalConfig
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar showAccessButtons={false} />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Card de Registro con estilo refinado */}
        <div className="w-full max-w-md bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-xl">
          <header className="mb-8 text-center">
            <span className="text-3xl block mb-2">🏛️</span>
            <h3 className="text-2xl font-black text-gray-900 tracking-tighter">
              Crear Usuario
            </h3>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-1">
              Registro Administrativo
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/20 transition-all font-medium text-sm"
                placeholder="Ej. admin_nativitas"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/20 transition-all font-medium text-sm"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all duration-300 shadow-lg ${
                  loading 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-[#C0392B] text-white hover:bg-[#A93226] hover:-translate-y-1 active:scale-95 shadow-[0_15px_30px_rgba(192,57,43,0.2)]'
                }`}
              >
                {loading ? 'Procesando...' : 'Finalizar Registro'}
              </button>
            </div>
          </form>
        </div>

        <button 
          className="mt-8 text-[10px] font-black text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          ← Volver al inicio
        </button>
      </main>
    </div>
  );
};

export default RegisterUser;