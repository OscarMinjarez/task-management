import { NextResponse } from "next/server";
import { login } from "./auth-service";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const user = await login(email, password);
        return NextResponse.json({
            message: "Inicio de sesión exitoso",
            user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}