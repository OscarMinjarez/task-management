import { NextResponse } from "next/server";
import { createList, findAllLists, editList, deleteList, findByUserUuid } from "./lists-service";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const userUuid = searchParams.get("userUuid");
    try {
        if (userUuid) {
            const lists = await findByUserUuid(userUuid);
            return NextResponse.json({ lists }, { status: 200 });
        }
        if (name) {
            const lists = await findAllLists();
            const list = lists.find(l => l.name === name.trim());
            if (!list) {
                return NextResponse.json({
                    message: "No se encontró una lista con ese nombre"
                }, { status: 404 });
            }
            return NextResponse.json({
                message: "Lista recuperada exitosamente",
                list
            });
        }
        const lists = await findAllLists();
        return NextResponse.json({ lists }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ 
            error: "Error interno del servidor" 
        }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { uuid, name, userUuid } = body;
        if (!uuid) {
            return NextResponse.json({ 
                error: "Por favor insertar el id de la lista a editar" 
            }, { status: 400 });
        }
        const updated = await editList(uuid.trim(), {
            ...(name && { name: name.trim() }),
            // ...(color && { color: color.trim() }),
            ...(userUuid && { userUuid: userUuid }),
            // ...(tasks && { tasks: tasks })
        });
        if (!updated) {
            return NextResponse.json({ 
                error: "Lista no encontrada" 
            }, { status: 404 });
        }
        return NextResponse.json({
            message: "Lista editada correctamente",
            list: updated
        });
    } catch (error: any) {
        return NextResponse.json({ 
            error: error.message 
        }, { status: 400 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, color, userUuid, tasks } = body;

        const newList = await createList({
            name: name.trim(),
            color: color.trim(),
            userUuid: userUuid,
            tasks: tasks || []
        });
        return NextResponse.json({
            message: "Lista creada correctamente",
            list: newList
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ 
            error: error.message 
        }, { status: 400 });
    }
}

export async function DELETE(req: Request){
    const { uuid } = await req.json();
    
        if (!uuid) {
            return NextResponse.json({ error: "UUID requerido" }, { status: 400 });
        }
    
        const deleted = await deleteList(uuid);
        if (!deleted) {
            return NextResponse.json({ error: "Lista no encontrada" }, { status: 404 });
        }
    
        return NextResponse.json({ message: "Lista eliminada correctamente" });
}
