import { useState } from "react";

const statusOptions = [
    { label: "Pendiente", value: "pendiente", color: "bg-red-500" },
    { label: "En progreso", value: "en proceso", color: "bg-yellow-500" },
    { label: "Completado", value: "completado", color: "bg-green-500" }
];

export default function StateSelect({ value, onChange }) {
    const [open, setOpen] = useState(false);

    const selected = statusOptions.find(opt => opt.value === value);

    return (
        <div className="relative w-full">
            {/* Selector visible */}
            <button
                type="button"
                className="w-full cursor-pointer border border-gray-300 rounded-md px-2 py-1 flex items-center justify-between bg-white"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${selected?.color}`}></span>
                    <span>{selected?.label}</span>
                </div>
                <i className="fa-solid fa-chevron-down text-gray-500 text-xs ml-1" aria-hidden="true"></i>
            </button>

            {/* Menú de opciones */}
            {open && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10">
                    {statusOptions.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className="px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-sm"
                        >
                            <span className={`w-2 h-2 rounded-full ${opt.color}`}></span>
                            <span>{opt.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}