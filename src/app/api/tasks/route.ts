import { NextResponse } from "next/server";
import { create, findAll, findById, updateTask, deleteTask  } from "./tasks-services";
import CreateTaskDto from "./dto/create-task-dto";

// Este devuelve todas las tareas
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get("uuid");

    if (uuid) {
        // Buscar una sola tarea por UUID
        const task = await findById(uuid);
        if (!task) {
            return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
        }
        return NextResponse.json({ task });
    }

    // Si no hay UUID, retorna todas las tareas
    const tasks = await findAll();
    return NextResponse.json({
        message: "Tareas encontradas",
        tasks
    });
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
import { updateTaskState } from "./tasks-services";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { uuid, state } = body;

        if (!uuid || !state) {
            return NextResponse.json({ error: "UUID y nuevo estado son requeridos" }, { status: 400 });
        }

        const validStates = ["completado", "en proceso", "pendiente"];
        if (!validStates.includes(state)) {
            return NextResponse.json({ error: "Estado no válido" }, { status: 400 });
        }

        const updatedTask = await updateTaskState(uuid, state);

        if (!updatedTask) {
            return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Estado de la tarea actualizado correctamente",
            task: updatedTask
        });

    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar el estado" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { uuid, title, description, state, dateLimit, list } = await req.json();

        if (!uuid) {
            return NextResponse.json({ error: "UUID requerido" }, { status: 400 });
        }

        const updated = await updateTask(uuid, { title, description, state, dateLimit, list });

        if (!updated) {
            return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
        }

        return NextResponse.json({ message: "Tarea actualizada", task: updated });
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { uuid } = await req.json();

    if (!uuid) {
        return NextResponse.json({ error: "UUID requerido" }, { status: 400 });
    }

    const deleted = await deleteTask(uuid);
    if (!deleted) {
        return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tarea eliminada correctamente" });
}




