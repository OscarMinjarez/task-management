import { NextResponse } from "next/server";
import { createUser, findAllUsers } from "./users-service";
import CreateUserDto from "./dto/create-user-dto";

export async function GET() {
    try {
        const users = await findAllUsers();
        return NextResponse.json({
            message: "Usuarios encontrados",
            users
        });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, name, email, password } = body;

        const newUser = await createUser({
            username: username.trim(),
            name: name.trim(),
            email: email.trim(),
            password: password.trim()
        });

        return NextResponse.json({
            message: "Usuario creado correctamente",
            user: newUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

