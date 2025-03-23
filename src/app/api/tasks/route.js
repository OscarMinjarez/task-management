import { NextResponse } from "next/server";

export async function GET() {
    return Response.json({message: "hola"});
}

export async function POST(req) {
    try {
        const body = await req.json(); // Convertimos el cuerpo de la petición a JSON
        const { descripcion, estado, asignado, titulo, fecha } = body; // Extraemos los datos

        // Validamos que todos los campos existen
        if (!descripcion || !estado || !asignado || !titulo || !fecha) {
            return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
        }

        return NextResponse.json({
            message: "Tarea recibida",
            tarea: { descripcion, estado, asignado, titulo, fecha },
        });
    } catch (error) {
        return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 500 });
    }
}

