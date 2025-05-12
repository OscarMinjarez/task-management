"use client";
import React from 'react';

const rewardObjectives = [100, 300, 500, 1000];
var objective = 0;

export default function BarProgress({ points }) {
    for (const obj of rewardObjectives){
        if (points < obj){
            objective = obj;            
            break;
        }
    }
    if (objective === 0) objective = obj;           
    return (
        <div className="bg-white rounded-lg w-full h-full p-4 flex flex-col items-center justify-center">
            <h3 className="font-semibold text-[#625f5f] mb-3">Tu progreso</h3>

            {/* Círculo de progreso */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-3">
                {/* Fondo del círculo */}
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    {/* Track (fondo gris) */}
                    <path
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="4"
                    />
                    {/* Progress */}
                    <path
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="4"
                        strokeDasharray={`${points % 100}, ${objective}`}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Contenido central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 mb-1">
                        <img
                            src="/logro-yellow.png"
                            alt="Estrella"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="text-lg font-bold text-[#4f46e5]">{points}</span>
                </div>
            </div>

            {/* Texto de nivel */}
            <p className="text-sm text-[#625f5f]">
                Nivel {Math.floor(points / 100) + 1} • {points % 100}/{objective} pts
            </p>
        </div>
    );
}