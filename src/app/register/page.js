"use client";
import { useState, useEffect } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  // Validación en tiempo real de contraseñas
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword);
    } else {
      setPasswordsMatch(true); // Reset cuando los campos están vacíos
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Resetear errores al escribir
    if (errorData.shown) {
      setErrorData({
        errorMessage: "",
        shown: false
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación final antes de enviar
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await register(formData);
      setShowSuccessModal(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (e) {
      // Manejo de errores
      if (e.message.includes("username") || e.message.includes("nombre de usuario")) {
        setErrorData({
          errorMessage: "El nombre de usuario ya está registrado",
          shown: true
        });
      } else if (e.message.includes("email") || e.message.includes("correo")) {
        setErrorData({
          errorMessage: "El correo electrónico ya está registrado",
          shown: true
        });
      } else {
        setErrorData({
          errorMessage: e.message,
          shown: true
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#c9d6ff' }}
    >
      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Registro exitoso!</h2>
              <p className="text-gray-600 mb-6 text-center">
                Tu cuenta ha sido creada correctamente
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de registro */}
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
            className="w-full cursor-pointer bg-white text-center px-6 py-3 rounded-xl text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nombre completo"
            required
          />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full cursor-pointer bg-white text-center px-6 py-3 rounded-xl text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nombre de usuario"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full cursor-pointer bg-white text-center px-6 py-3 rounded-xl text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Correo electrónico"
            required
          />

          {/* Campo de contraseña */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full cursor-pointer bg-white text-center px-6 py-3 rounded-xl text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Contraseña"
              minLength="8"
              required
            />

            {/* Botón de visibilidad */}
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

          {/* Confirmación de Contraseña */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full cursor-pointer bg-white text-center px-6 py-3 border ${formData.confirmPassword
                ? passwordsMatch ? 'border-green-500' : 'border-red-500'
                : 'border-none'
                } rounded-xl text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 ${formData.confirmPassword
                  ? passwordsMatch ? 'focus:ring-green-500' : 'focus:ring-red-500'
                  : 'focus:ring-indigo-500'
                }`}
              placeholder="Confirmar contraseña"
              minLength="8"
              required
            />

            {/* Botón de visibilidad */}
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

          {/* Mensajes de validación */}
          {formData.confirmPassword && !passwordsMatch && (
            <p className="text-red-500 text-sm text-center">
              Las contraseñas no coinciden
            </p>
          )}
          {formData.confirmPassword && passwordsMatch && (
            <p className="text-green-500 text-sm text-center">
              Las contraseñas coinciden
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer py-3 px-6 text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 bg-[#6467d1]"
            disabled={!passwordsMatch || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registrando...
              </span>
            ) : 'Registrarse'}
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
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ocurrió un error durante el registro");
    }

    return data.user;
  } catch (e) {
    throw new Error(e.message);
  }
}