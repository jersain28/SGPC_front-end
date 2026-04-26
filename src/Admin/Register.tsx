import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Obtenemos el token del administrador logueado (el que está creando la cuenta)
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/crear-trabajador/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 2. Enviamos el token para que Django sepa que quien crea el usuario es un Admin
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 3. Si todo sale bien, mandamos a la pantalla de éxito que ya creaste
        navigate('/admin/success');
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Error al crear el usuario. Verifica que el nombre no esté duplicado.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error de conexión con el servidor.");
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
            Registrar Nuevo Trabajador
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
                className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-panteon-red/50"
                placeholder="Ej. JuanPerez_Nativitas"
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
                className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-panteon-red/50"
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg ${loading ? 'opacity-50' : ''}`}
              >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </button>
            </div>
          </form>
        </div>

        <button 
          className="mt-8 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-8 rounded-full transition-all shadow-sm"
          onClick={() => navigate('/admin')}
        >
          Cancelar y Volver
        </button>
      </main>
    </div>
  );
};

export default Register;