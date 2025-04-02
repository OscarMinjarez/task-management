"use client";

export default function TaskItem() {
    return (
        <div className="bg-white w-full h-auto flex justify-between">
            <div className="flex flex-col">
                <h1 className="font-bold">Diseñar Frontend</h1>

                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-calendar" aria-hidden="true"></i>
                    <p>Hoy</p>
                </div>
            </div>

            <div className="flex">
                <div>
                    <select>
                        <option>Escuela</option>
                        <option>Cocina</option>
                        <option>Personal</option>
                        <option>Social</option>
                    </select>
                </div>

                <div className="">
                    <select>
                        <option>En progreso</option>
                        <option>Pendiente</option>
                        <option>Completada</option>
                    </select>
                </div>
            </div>
        </div>
    ); 
}