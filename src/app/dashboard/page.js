import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import "./dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container bg-[#eef2ff] flex">
            <Sidebar />
            <div className="flex flex-col w-full items-center">
                <TaskItem />
            </div>
        </div>
    );
}