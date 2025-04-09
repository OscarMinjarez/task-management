"use client";
import { useState } from 'react';
import Image from 'next/image';
import logo from 'public/logo.png';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Aquí va la llamada del API para recuperar contraseña
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación de API call
      
      setMessage(`Se ha enviado un enlace de recuperación a ${email}`);
      setEmail('');
    } catch (error) {
      setMessage('Error al enviar el enlace. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#c9d6ff' }}
    >
      <div className="w-full max-w-md rounded-lg p-8">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            alt="Taskit logo"
            width={280}
            height={280}
            className="mb-6"
          />
          <h1 className="text-2xl font-bold text-[#6467d1] mb-2">Recuperar Contraseña</h1>
          <p className="text-sm text-[#6467d1] mb-6 text-center">
            Ingresa tu correo electrónico para recibir un enlace de recuperación
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Correo electrónico"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 px-6 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex justify-center items-center"
            style={{ backgroundColor: '#6467d1' }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : 'Enviar enlace'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-[#6467d1]">
            ¿Recordaste tu contraseña?{' '}
            <a href="/login" className="hover:underline font-medium">
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}