import React, { useState } from 'react';

const LoginUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Intentando iniciar sesión:', { username, password });
    // Aquí conectarías con tu lógica de autenticación
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <nav className="bg-white py-6 px-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#C0392B] font-bold text-xl uppercase tracking-wider">
            Comunidad de Nativitas
          </h2>
        </div>
      </nav>

      {/* Contenedor del Formulario */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-400 p-8 shadow-sm">
          <h3 className="text-center text-xl font-bold text-gray-800 mb-8">
            Iniciar Sesion
          </h3>

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Campo Usuario */}
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
              />
            </div>

            {/* Campo Contraseña */}
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
              />
            </div>

            {/* Botón Iniciar Sesión */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform active:scale-95 shadow-lg"
              >
                Iniciar Sesion
              </button>
            </div>
          </form>
        </div>

        {/* Botón Regresar al Inicio */}
        <button 
          className="mt-8 bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-8 rounded-full transition-all shadow-sm"
          onClick={() => window.history.back()}
        >
          Regresar al Inicio
        </button>
      </main>
    </div>
  );
};

export default LoginUser;