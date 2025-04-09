"use client";
import { useEffect } from "react";

export default function AchievementNotification({ achievement }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            document.querySelector('.achievement-notification').classList.add('fade-out');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="achievement-notification fixed bottom-4 right-4 bg-[#4f46e5] text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            <div className="flex items-center">
                <span className="text-xl mr-2">{achievement.badge}</span>
                <div>
                    <p className="font-bold">¡Logro desbloqueado!</p>
                    <p>{achievement.name} - {achievement.points} pts</p>
                </div>
            </div>
        </div>
    );
}