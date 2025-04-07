import Image from 'next/image';
import logo from 'public/logo.png';
import React from 'react';

export default function LoginPage() {
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
        </div>

        <form className="space-y-4">
          <input
            type="email"
            id="email"
            className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Correo electrónico"
            required
          />

          <input
            type="password"
            id="password"
            className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Contraseña"
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer py-3 px-6 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#6467d1' }}
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <a
            href="#"
            className="text-sm text-[#6467d1] hover:underline"
          >
            ¿Has olvidado tu contraseña?
          </a>
          <p className="text-sm text text-[#6467d1]">
            ¿No tienes cuenta?{' '}
            <a href="#" className="hover:underline font-medium">
              ¡Regístrate!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}