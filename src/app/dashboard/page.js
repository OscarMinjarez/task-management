import Sidebar from "../../components/Sidebar";
import TaskItem from "../../components/TaskItem";
import Header from "../../components/Header";
import "./dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container bg-[#eef2ff] flex min-h-screen">
            <Sidebar />
            
            {/* Contenedor principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 pb-0">
                    <Header />
                </div>
                
                {/* Contenedor con scroll */}
                <div className="flex-1 overflow-y-auto p-6 pt-4">
                    {/* Encabezados de columnas */}
                    <div className="grid grid-cols-12 gap-4 mb-2 px-2">
                        <div className="col-span-6">
                            <h2 className="text-lg font-semibold text-[#625f5f]">Tareas</h2>
                        </div>
                        <div className="col-span-3">
                            <h2 className="text-lg font-semibold text-[#625f5f]">Lista</h2>
                        </div>
                        <div className="col-span-3">
                            <h2 className="text-lg font-semibold text-[#625f5f]">Estado</h2>
                        </div>
                    </div>
                    
                    {/* Lista de tareas */}
                    <div className="space-y-2">
                        {[...Array(7)].map((_, i) => (
                            <TaskItem key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}