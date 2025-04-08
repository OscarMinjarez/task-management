"use client";
import Sidebar from "../../components/Sidebar";
import TaskItem from "../../components/TaskItem";
import Header from "../../components/Header";
import Calendar from "../../components/Calendar";
import Image from 'next/image';
import UserLogo from 'public/user.png';
import "./dashboard.css";
import { useState } from "react";
import AchievementNotification from "../../components/AchievementNotification";
import BarProgress from "../../components/BarProgress";

export default function Dashboard() {
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
                <div className="flex flex-col lg:flex-row w-full sm:overflow-y-auto lg:overflow-hidden">
                    {/* Área izquierda */}
                    <div className="w-full lg:w-[750px] flex flex-col">
                        <div className="p-6 pb-0">
                            <Header />
                        </div>

                        {/* Contenedor de tareas */}
                        <div className="flex-1 p-6 pt-2 overflow-y-auto">
                            {/* Encabezados*/}
                            <div className="grid grid-cols-12 gap-4 -mt-4 mb-2 px-2">
                                <div className="col-span-6">
                                    <h2 className="text-xl font-semibold text-[#625f5f]">Tareas</h2>
                                </div>
                                <div className="col-span-3">
                                    <h2 className="text-lg font-semibold text-[#625f5f]">Lista</h2>
                                </div>
                                <div className="col-span-3">
                                    <h2 className="text-lg font-semibold text-[#625f5f]">Estado</h2>
                                </div>
                            </div>

                            {/* TaskItems */}
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

                    {/* Área derecha*/}
                    <div className="w-full lg:flex-1 flex flex-col pt-6 pr-6">
                        {/* Sección usuario */}
                        <div className="flex justify-end">
                            <p className="text-lg font-bold text-[#625f5f] ml-2">Usuario</p>
                            <div className="flex flex-col ml-2 items-center">
                                <Image
                                    src={UserLogo}
                                    alt="User logo"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className="bg-[#e0e7ff] rounded-full px-3 py-1 ml-2">
                                <span className="text-[#4f46e5] font-bold">{points} pts</span>
                            </div>
                        </div>

                        {/* Calendario */}
                        <div className="flex-1 flex items-start justify-center mt-4 lg:mt-6 lg:justify-start lg:pl-4">
                            <Calendar />
                        </div>

                        {/* Sistema de Recompensas*/}
                        <div className="flex-1 flex items-start justify-center mt-4 lg:-mt-3 lg:justify-start lg:pl-4">
                            <BarProgress points={points} />
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