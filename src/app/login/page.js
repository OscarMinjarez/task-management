"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from 'public/logo.png';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData);
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
        </div>

        <form className="space-y-4">
          <input
            type="email"
            id="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
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
              name='password'
              value={formData.password}
              onChange={handleChange}
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
            onClick={handleSubmit}
          >
            Iniciar Sesión
          </button>
        </form>

        {errorData.shown && (
          <div className="mt-4 text-center text-red-600 font-medium">
            {errorData.errorMessage}
          </div>
        )}

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

async function login(user) {
  try {
    const response = await fetch(`http://localhost:3000/api/auth`, {
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