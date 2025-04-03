"use client";

function ListOptions({ options }) {
    return (
        <div>
            <select className="bg-red-200 border-red-400 text-black py-1 px-2 rounded-[6px]">
                {options.map((option) => {
                    return <option key={option}>{option}</option>
                })}
            </select>
        </div>
    );
}

export default function TaskItem() {
    return (
        <div className="bg-white w-full h-auto flex justify-between items-center px-5 py-2 rounded-[12px] my-2">
            <div className="flex flex-col">
                <h1 className="font-bold">Diseñar Frontend</h1>

                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-calendar" aria-hidden="true"></i>
                    <p>Hoy</p>
                </div>
            </div>

            <div className="flex gap-x-3">
                <div>
                    <ListOptions
                        options={["Escuela", "Cocina", "Personal", "Social"]}/>
                </div>

                <div className="">
                    <ListOptions
                        options={["En progreso", "Completado", "Pendiente"]}/>
                </div>
            </div>
        </div>
    ); 
}