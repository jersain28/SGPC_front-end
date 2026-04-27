import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const LoginUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Guardar el token de acceso
        localStorage.setItem('access_token', data.access);

        // 2. Procesar el nombre de forma segura para evitar el error "undefined"
        // Usamos encadenamiento opcional (?.) y valores por defecto (||)
        const user = data.user || {};
        const firstName = user.first_name || '';
        const lastName = user.last_name || '';
        const fallbackName = user.username || username || 'Ciudadano';

        // Construir nombre completo o usar el username si el nombre está vacío en Django
        const nombreCompleto = `${firstName} ${lastName}`.trim() || fallbackName;

        // 3. Guardar en LocalStorage con las llaves que MisTramites.tsx espera
        localStorage.setItem('user_full_name', nombreCompleto);
        localStorage.setItem('user_initials', nombreCompleto.charAt(0).toUpperCase());

        // 4. Redirigir al portal
        navigate('/MisTramites');
      } else {
        alert("Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor. ¿Está encendido Django?");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar showAccessButtons={false} />

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-400 p-8 shadow-sm">
          <h3 className="text-center text-xl font-bold text-gray-800 mb-8">
            Portal Ciudadano
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

export default LoginUser;