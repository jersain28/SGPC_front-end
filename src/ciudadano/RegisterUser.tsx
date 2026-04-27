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

  // Mantenemos la configuración de SweetAlert2 con el estilo institucional
  const swalConfig = {
    customClass: {
      confirmButton: 'bg-[#C0392B] text-white font-bold py-3 px-8 rounded-xl transition-all mx-2',
      popup: 'rounded-2xl border border-gray-400 shadow-lg',
      title: 'text-xl font-bold text-gray-800',
      htmlContainer: 'text-gray-600'
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
        // Alerta profesional de éxito
        await MySwal.fire({
          title: '¡Éxito!',
          text: 'Usuario creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ir al Login',
          ...swalConfig
        });
        navigate('/login');
      } else {
        // Alerta profesional de error
        MySwal.fire({
          title: 'Error',
          text: data.message || 'No se pudo crear el usuario',
          icon: 'error',
          confirmButtonText: 'Reintentar',
          ...swalConfig
        });
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error de conexión',
        text: 'Hubo un problema con el servidor.',
        icon: 'error',
        confirmButtonText: 'Entendido',
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
        {/* Tu diseño original intacto */}
        <div className="w-full max-w-md bg-white border border-gray-400 p-8 shadow-sm">
          <h3 className="text-center text-xl font-bold text-gray-800 mb-8">
            Crear Usuario
          </h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold">
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#C0392B]/30"
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Creando...' : 'Crear Usuario'}
              </button>
            </div>
          </form>
        </div>

        <button 
          className="mt-8 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-8 rounded-full transition-all shadow-sm"
          onClick={() => navigate('/login')}
        >
          Regresar al Inicio
        </button>
      </main>
    </div>
  );
};

export default RegisterUser;