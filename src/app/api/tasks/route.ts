import { NextResponse } from "next/server";
import { taskService } from "./taskservice";


export async function GET() {
    return Response.json({message: "hola"});
}

export async function POST(req: NextResponse) {
    try {
        const body = await req.json(); // Convertimos el cuerpo de la petición a JSON
        const { descripcion, estado, titulo, fechaCreacion, fechaLimite } = body; // Extraemos los datos

        // Validamos que todos los campos existen
        if (!descripcion || !estado || !fechaCreacion || !titulo || !fechaLimite) {
            return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
        }

        
        // Agregamos la tarea y obtenemos el ID generado
        const taskId = taskService.addTask(body);

        return NextResponse.json({
            message: "Tarea recibida",
            tareaId: taskId,
        });
    } catch (error) {
        return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 500 });
    }
}

