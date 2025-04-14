import { NextResponse } from "next/server";
import { createUser, findAllUsers } from "./users-service";
import CreateUserDto from "./dto/create-user-dto";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    try {
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json({
                    error: "El email debe ser válido"
                }, { status: 400 });
            }

            const users = await findAllUsers();
            const user = users.find(u => u.email === email.trim());

            if (!user) {
                return NextResponse.json({
                    message: "No se encontró un usuario con ese correo"
                }, { status: 404 });
            }

            return NextResponse.json({
                message: "Contraseña recuperada exitosamente",
                password: user.password
            });
        }

        // Si no hay email, entonces se devuelven todos los usuarios
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

