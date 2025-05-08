"use client";

import Image from 'next/image';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import StateSelect from './StateSelect';
import UserLists from "./UserLists"

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
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
    const { lists } = UserLists();
    const [list, setList] = useState(task.list?.name || "Personal");
    const [status, setStatus] = useState(task.state || "Pendiente");
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleClick = () => {
        const wasCompleted = isCompleted;
        onToggleComplete(task.uuid);
        setIsCompleted(!wasCompleted);
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

    async function handleStateChange(newState) {
        setStatus(newState);
        try {
            const response = await fetch('/api/tasks', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uuid: task.uuid,
                    state: newState,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('Error al actualizar estado:', data.error);
            }
        } catch (error) {
            console.error('Error de red al actualizar el estado:', error);
        }
    }

    const handleListChange = async (newListName) => {
        setList(newListName);
        try {
            const response = await fetch('http://localhost:3000/api/tasks', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uuid: task.uuid,
                    list: newListName,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.error("Error al actualizar lista:", data.error);
            }
        } catch (error) {
            console.error("Error de red al actualizar lista:", error);
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
                    aria-label={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
                >
                    <div className="relative">
                    <Image
                        src={isCompleted ? "/logro-yellow.png" : "/logro-gray.png"}
                        alt={isCompleted ? "Tarea completada" : "Tarea pendiente"}
                        width={30}
                        height={30}
                        className={`transition-all duration-300 ${isAnimating ? 'animate-ping' : ''}`}
                    />
                    </div>
                </button>
            </div>

            {/* Columna Tarea */}
            <div className="col-span-5 flex flex-col justify-center">
                <h3 className={`font-medium ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                    <span>{formatDate(task.dateLimit)}</span>
                    <i className="fa-regular fa-note-sticky" aria-hidden="true"></i>
                    <span>{task.description.slice(0, 12) + "..."}</span>
                </div>
            </div>

            {/* Columna Lista */}
            <div className="col-span-3 flex items-center gap-2">
                <ListOptions
                    options={["Personal", ...lists.map(l => l.name).filter(name => name !== "Personal")]}
                    value={task.list?.name ?? "Personal"}
                    onChange={(e) => handleListChange(e.target.value)}
                />
            </div>

            {/* Columna Estado */}
            <div className="col-span-3 flex items-center gap-2">
                <StateSelect
                    value={status}
                    onChange={handleStateChange} />
            </div>
        </div>
    );
}