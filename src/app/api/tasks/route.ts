import { NextResponse } from "next/server";
import { create, findAll } from "./tasks-services";
import CreateTaskDto from "./dto/create-task-dto";

export async function GET() {
    try {
        const tasks = await findAll();
        return NextResponse.json({
            message: "Tareas encontradas",
            tasks
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(req: NextResponse) {
    try {
        const body = await req.json();
        const { description, title, dateLimit } = body;
        const task = new CreateTaskDto();
        if (!description || !title || !dateLimit) {
            return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
        }
        task.title = title;
        task.description = description;
        task.state = "pendiente";
        task.dateLimit = new Date(dateLimit);
        const newTask = await create(task);
        return NextResponse.json({
            message: "Tarea recibida",
            task: newTask
        });
    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

