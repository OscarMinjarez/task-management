"use client";
import LogroAmarillo from 'public/logro-yellow.png';
import LogroGris from 'public/logro-gray.png';
import Image from 'next/image';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import StateSelect from './StateSelect';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    return date.toLocaleDateString('es-ES', options);
}

// Componente ListOptions original (sin cambios)
function ListOptions({ options, value, onChange }) {
    return (
        <select
            className="w-full cursor-pointer text-sm bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
}

export default function TaskItem({ task, onToggleComplete }) {
    const [list, setList] = useState("Personal");
    const [status, setStatus] = useState("Pendiente");
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        const wasCompleted = task.completed;
        onToggleComplete();

        if (!wasCompleted) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 1000);

            const audio = new Audio('/sounds/tin-sound.wav');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Error de audio:', e));

            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
            });
        }
    };

    return (
        <div className="grid grid-cols-12 gap-4 px-3 bg-white rounded-lg shadow-sm h-[60px] relative">
            {/* Columna para la estrella */}
            <div className="col-span-1 flex items-center justify-start">
                <button
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="p-1 cursor-pointer group"
                    aria-label={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                >
                    <div className="relative">
                        <Image
                            src={LogroGris}
                            alt="Tarea pendiente"
                            width={30}
                            height={30}
                            className={`transition-all duration-300 ${task.completed ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0`}
                        />
                        <Image
                            src={LogroAmarillo}
                            alt="Tarea completada"
                            width={30}
                            height={30}
                            className={`absolute top-0 left-0 transition-all duration-300 ${task.completed ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 ${isAnimating ? 'animate-ping' : ''}`}
                        />
                    </div>
                </button>
            </div>

            {/* Columna Tarea */}
            <div className="col-span-5 flex flex-col justify-center">
                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                    <span>{formatDate(task.dateLimit)}</span>
                </div>
            </div>

            {/* Columna Lista */}
            <div className="col-span-3 flex items-center">
                <ListOptions
                    options={["Escuela", "Cocina", "Personal", "Social"]}
                    value={list}
                    onChange={(e) => setList(e.target.value)}
                />
            </div>

            {/* Columna Estado */}
            <div className="col-span-3 flex items-center gap-2">
                <StateSelect
                    value={status}
                    onChange={(val) => setStatus(val)} />
            </div>
        </div>
    );
}