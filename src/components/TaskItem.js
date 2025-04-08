"use client";

function ListOptions({ options }) {
    return (
        <select className="w-full text-sm bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none">
            {options.map((option) => (
                <option key={option}>{option}</option>
            ))}
        </select>
    );
}

export default function TaskItem() {
    return (
        <div className="grid grid-cols-12 gap-4 bg-white p-3 rounded-lg shadow-sm">
            {/* Columna Tarea */}
            <div className="col-span-6">
                <div className="flex items-center gap-2">
                    <span className="text-green-500">⭐</span>
                    <h3 className="font-medium">Diseñar Frontend</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <i className="fa-regular fa-calendar"></i>
                    <span>Hoy</span>
                </div>
            </div>
            
            {/* Columna Lista */}
            <div className="col-span-3">
                <ListOptions options={["Escuela", "Cocina", "Personal", "Social"]} />
            </div>
            
            {/* Columna Estado */}
            <div className="col-span-3">
                <ListOptions options={["En progreso", "Completado", "Pendiente"]} />
            </div>
        </div>
    );
}