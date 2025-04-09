"use client";
import { useState } from 'react';
import LogroAmarillo from 'public/logro-yellow.png';
import LogroGris from 'public/logro-gray.png';
import Image from 'next/image';
import confetti from 'canvas-confetti';

// íconos SVG
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.227a48.389 48.389 0 00-6 0v-.227c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
    </svg>
);

export default function TaskFormSidebar({ isOpen, onClose, onCreate, onDelete, task = {}, onToggleComplete }) {
    const [title, setTitle] = useState(task.title || '');
    const [status, setStatus] = useState(task.status || 'En progreso');
    const [list, setList] = useState(task.list || 'Personal');
    const [dueDate, setDueDate] = useState(task.dueDate || '');
    const [description, setDescription] = useState(task.description || '');
    const [creationDate] = useState(task.creationDate || new Date().toLocaleDateString('es-ES'));
    const [isAnimating, setIsAnimating] = useState(false);
    const [completed, setCompleted] = useState(task.completed || false);

    const handleToggleComplete = () => {
        const newCompleted = !completed;
        setCompleted(newCompleted);

        if (newCompleted) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);

            // Efecto de confeti
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
            });

            // Sonido (opcional)
            const audio = new Audio('/sounds/tin-sound.wav');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Error de audio:', e));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            title,
            status,
            list,
            dueDate,
            description,
            creationDate,
            completed
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/15" onClick={onClose}></div>

            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-all duration-300">
                <div className="flex flex-col h-full p-6 bg-[#c9d6ff]">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={onClose}
                            className="text-gray-500 cursor-pointer hover:text-gray-700 ml-auto"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    {/* Header */}
                    <div className="flex justify-between mt-2 items-center mb-6">
                        <h2 className="text-xl font-bold text-[#625f5f]">{task.id ? 'Editar tarea' : 'Nueva tarea'}</h2>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                        <div className="mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`w-full placeholder:italic px-12 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6467d1] ${completed ? 'line-through text-gray-400' : ''
                                        }`}
                                    placeholder="Título de la tarea"
                                    required
                                    autoFocus
                                />

                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <button
                                        type="button"
                                        onClick={handleToggleComplete}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="cursor-pointer group"
                                        aria-label={completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                                    >
                                        <div className="relative">
                                            <Image
                                                src={LogroGris}
                                                alt="Tarea pendiente"
                                                width={24}
                                                height={24}
                                                className={`transition-all top-0 left-0 duration-300 ${completed ? 'opacity-0' : 'opacity-100'
                                                    } group-hover:opacity-0`}
                                            />
                                            <Image
                                                src={LogroAmarillo}
                                                alt="Tarea completada"
                                                width={24}
                                                height={24}
                                                className={`absolute top-0 left-0 transition-all duration-300 ${completed ? 'opacity-100' : 'opacity-0'
                                                    } group-hover:opacity-100 ${isAnimating ? '' : ''}`}
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-[#625f5f] font-medium mb-2">Estado</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6467d1]"
                                >
                                    <option value="En progreso">En progreso</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Completado">Completado</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#625f5f] font-medium mb-2">Lista</label>
                                <select
                                    value={list}
                                    onChange={(e) => setList(e.target.value)}
                                    className="w-full px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6467d1]"
                                >
                                    <option value="Personal">Personal</option>
                                    <option value="Trabajo">Trabajo</option>
                                    <option value="Estudio">Estudio</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-[#625f5f] font-medium mb-2">Fecha de Vencimiento</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6467d1] pl-10"
                                />
                                <div className="absolute left-3 top-3 text-gray-400">
                                    <CalendarIcon />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 flex-1">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-52 px-4 py-2 bg-white rounded-lg placeholder:italic focus:outline-none focus:ring-2 focus:ring-[#6467d1] resize-none"
                                placeholder="Agregar descripción..."
                            />

                            <div className="text-sm text-[#6467d1] mt-2">
                                Creada el {creationDate}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <div className="relative inline-block">
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm('¿Eliminar esta tarea?')) {
                                            onDelete();
                                            onClose();
                                        }
                                    }}
                                    className="group mt-4 cursor-pointer p-2 text-[#6467d1] scale-130 hover:scale-150 active:scale-95 
                                        transition-transform duration-300 ease-in-out"
                                    aria-label="Eliminar tarea"
                                >
                                    {/* Icono de basura */}
                                    <div className="relative -ml-2">
                                        <TrashIcon />

                                        {/* Tooltip con efecto de aparición */}
                                        <span className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 
                                            bg-gray-800/80 text-white text-xs py-1 px-2 rounded opacity-0 
                                            group-hover:opacity-100 transition-all duration-300 whitespace-nowrap 
                                            shadow-md scale-75 group-hover:scale-80">
                                            Eliminar tarea
                                            {/* Flecha del tooltip */}
                                            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-solid border-transparent border-t-gray-800/80"></span>
                                        </span>
                                    </div>

                                    {/* Efecto de pulso al hacer hover (opcional) */}
                                    <span className="absolute inset-0 rounded-full opacity-0 
                                        group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-200">
                                    </span>
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#6467d1] text-white rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}