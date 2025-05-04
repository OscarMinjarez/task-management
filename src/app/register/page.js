"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from 'public/logo.png';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorData, setErrorData] = useState({
    errorMessage: "",
    shown: false
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePasswords = (e) => {
    const { value } = e.target;
    setPasswordsMatch(formData.password === value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    try {
      const user = await register(formData);
      window.localStorage.setItem("user_uuid", user.uuid);
      router.push("/dashboard");
    } catch (e) {
      setErrorData({
        errorMessage: e.message,
        shown: true
      })
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
          <h1 className="text-2xl font-bold text-[#6467d1] mb-6">Registrar Cuenta</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nombre completo"
          />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nombre de usuario"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Correo electrónico"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Contraseña"
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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={validatePasswords}
              className={`w-full cursor-pointer bg-white text-center px-6 py-3 border-none rounded-xl text-black placeholder:text-black focus:outline-none focus:ring-2 ${!passwordsMatch ? 'focus:ring-red-500' : 'focus:ring-indigo-500'}`}
              placeholder="Confirmar contraseña"
              minLength="8"
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-[#6467d1]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
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

          {!passwordsMatch && (
            <p className="text-red-500 text-sm text-center">
              Las contraseñas no coinciden
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer py-3 px-6 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#6467d1' }}
            disabled={!passwordsMatch}
          >
            Registrarse
          </button>
        </form>

        {errorData.shown && (
          <div className="mt-4 text-center text-red-600 font-medium">
            {errorData.errorMessage}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-[#6467d1]">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="hover:underline font-medium">
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

async function register(user) {
  try {
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Ocurrió un error");
    }
    return data.user;
  } catch (e) {
    throw Error(e.message);
  }
}