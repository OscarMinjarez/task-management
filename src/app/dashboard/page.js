"use client";
import Sidebar from "../../components/Sidebar";
import TaskItem from "../../components/TaskItem";
import Header from "../../components/Header";
import Calendar from "../../components/Calendar";
import "./dashboard.css";
import { useState } from "react";
import AchievementNotification from "../../components/AchievementNotification";
import BarProgress from "../../components/BarProgress";

export default function Dashboard({
    username = "Usuario",
}) {
    const [points, setPoints] = useState(0);
    const [tasks, setTasks] = useState(
        Array(30).fill().map((_, i) => ({
            id: i + 1,
            title: `Tarea ${i + 1}`,
            completed: false,
            date: 'Hoy'
        }))
    );
    const [unlockedAchievement, setUnlockedAchievement] = useState(null);

    const rewards = [
        { level: 1, badge: "🥉", name: "Principiante", points: 100 },
        { level: 2, badge: "🥈", name: "Intermedio", points: 300 },
        { level: 3, badge: "🥇", name: "Avanzado", points: 500 },
        { level: 4, badge: "🏆", name: "Experto", points: 1000 }
    ];

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const wasCompleted = task.completed;
                const newCompleted = !wasCompleted;

                // Actualizar puntos
                setPoints(prev => newCompleted ? prev + 10 : prev - 10);

                // Verificar logros
                checkAchievements(newCompleted ? points + 10 : points - 10);

                return { ...task, completed: newCompleted };
            }
            return task;
        }));
    };

    // Obtener la fecha actual formateada
    const getCurrentDate = () => {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Date().toLocaleDateString('es-ES', options);
    };


    const checkAchievements = (currentPoints) => {
        const newAchievement = rewards.find(reward =>
            currentPoints >= reward.points &&
            points < reward.points
        );

        if (newAchievement) {
            setUnlockedAchievement(newAchievement);
            setTimeout(() => setUnlockedAchievement(null), 3000);
        }
    };

    return (
        <>
            <div className="dashboard-container bg-[#eef2ff] flex h-screen min-h-full overflow-hidden">
                <Sidebar />

                {/* Contenedor principal */}
                <div className="flex flex-col w-full overflow-hidden">
                    {/* Header */}
                    <div className="w-full p-6 pb-0">
                        <Header
                            points={points}
                            pageTitle="Dashboard"
                            pageIcon="home"
                        />
                    </div>

                    {/* Contenido debajo del header*/}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Área izquierda */}
                        <div className="w-full lg:w-[750px] flex flex-col overflow-hidden">

                            <div className="overflow-y-auto h-full">
                                {/* saludo y fecha */}
                                <div className="sticky top-0 z-10 bg-[#eef2ff] pt-4 pb-2 px-6">
                                    <div className='bg-[#c9d6ff] py-3 px-6 rounded-xl'>
                                        <div className="flex items-center gap-4 mt-1">
                                            <p className="text-lg text-black font-bold">¡Hola {username}!</p>
                                        </div>
                                        <div className='flex items-center gap-4 mt-1'>
                                            <p className="text-lg text-black">{getCurrentDate()}</p>
                                        </div>
                                    </div>

                                    {/* Encabezados*/}
                                    <div className="sticky top-0 z-10 grid grid-cols-12 gap-4 mt-2 px-2 bg-[#eef2ff] py-2">
                                        <div className="col-span-6">
                                            <h2 className="text-xl font-bold text-[#625f5f]">Tareas</h2>
                                        </div>
                                        <div className="col-span-3">
                                            <h2 className="text-lg font-bold text-[#625f5f]">Lista</h2>
                                        </div>
                                        <div className="col-span-3">
                                            <h2 className="text-lg font-bold text-[#625f5f]">Estado</h2>
                                        </div>
                                    </div>
                                </div>

                                {/* TaskItems */}
                                <div className="px-6 pb-6">
                                    <div className="space-y-3">
                                        {tasks.map((task) => (
                                            <TaskItem
                                                key={task.id}
                                                task={task}
                                                onToggleComplete={() => toggleTaskCompletion(task.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Área derecha (calendario y progreso) */}
                        <div className="hidden lg:flex flex-col w-[400px] xl:w-[450px] pl-6 pr-6">
                            {/* Calendario alineado con el saludo */}
                            <div className="mt-[20px]"> {/* Ajusta este valor según necesidad */}
                                <Calendar />
                            </div>

                            {/* Barra de progreso */}
                            <div className="mt-4">
                                <BarProgress points={points} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notificación de logro */}
                {unlockedAchievement && (
                    <AchievementNotification achievement={unlockedAchievement} />
                )}
            </div>
        </>
    );
}