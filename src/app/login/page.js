"use client";
import Image from 'next/image';
import logo from 'public/logo.png';
import { React, useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Contraseña"
              required
              minLength="8"
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-[#6467d1]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

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
            href="/forgot-password"
            className="text-sm text-[#6467d1] hover:underline"
          >
            ¿Has olvidado tu contraseña?
          </a>
          <p className="text-sm text text-[#6467d1]">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="hover:underline font-medium">
              ¡Regístrate!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}