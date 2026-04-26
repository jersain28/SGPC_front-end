import { jwtDecode } from 'jwt-decode'; // Importante: npm install jwt-decode
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la navegación profesional

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Guardamos el token en localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        // 2. Decodificamos el token para verificar si es Staff (Admin)
        const decoded: any = jwtDecode(data.access);

        if (decoded.is_staff) {
          // Si es administrador, mandarlo a su panel
          navigate('/admin/dashboard');
        } else {
          // Si es un ciudadano intentando entrar al login de admin
          alert("Acceso denegado: Esta interfaz es solo para personal autorizado.");
          localStorage.clear(); // Limpiamos el token por seguridad
        }
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white py-6 px-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#C0392B] font-bold text-xl uppercase tracking-wider">
            Comunidad de Nativitas
          </h2>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-400 p-8 shadow-sm">
          <h3 className="text-center text-xl font-bold text-gray-800 mb-8">
            Panel Administrativo
          </h3>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="block text-gray-800 font-semibold">
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-panteon-red/30 transition-all"
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
                className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-panteon-red/30 transition-all"
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Verificando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
        </div>

        <button 
          className="mt-8 bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-8 rounded-full transition-all shadow-sm"
          onClick={() => navigate('/admin')} // Redirigir al Home público
        >
          Regresar al Inicio
        </button>
      </main>
    </div>
  );
};

export default Login;