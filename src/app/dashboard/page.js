import Sidebar from "../../components/Sidebar";
import TaskItem from "../../components/TaskItem";
import "./dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container bg-[#eef2ff] flex">
            <Sidebar />
            <div className="flex flex-col w-full items-center p-4">
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
            </div>
        </div>
    );
}