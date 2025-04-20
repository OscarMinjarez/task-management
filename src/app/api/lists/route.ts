import { NextResponse } from "next/server";
import { createList, findAllLists, editList, deleteList } from "./lists-service";
import CreateListDto from "./dto/create-list-dto";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    try {
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
                uuid: list.uuid
            });
        }

        // Si no hay nombre, entonces se devuelven todos las listas
        const lists = await findAllLists();
        return NextResponse.json({
            message: "Listas encontradas",
            lists
        });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {name, color } = body;

        const newList = await createList({
            name: name.trim(),
            color: color.trim(),
        });

        return NextResponse.json({
            message: "Lista creada correctamente",
            list: newList
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const {uuid, name, color} = body;

        if (!uuid){
            return NextResponse.json({ error: "Por favor insertar el id de la lista a editar" }, { status: 400 });
        }

        if (!name && !color){
            return NextResponse.json({ error: "Se tiene que insertar los datos para editar" }, { status: 400 });
        }


        const updated = await editList(uuid.trim() ,{
            name: name.trim(),
            color: color.trim(),
        });

        if (!updated){
            return NextResponse.json({ error: "Lista no encontrada" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Lista editada correctamente",
            list: updated
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
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
