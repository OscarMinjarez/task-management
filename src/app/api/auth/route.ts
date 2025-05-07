import { NextResponse } from 'next/server';
import { findUserByEmail, comparePasswords } from '../users/users-service';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Validación básica
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // Buscar usuario por email
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json(
                { error: "Credenciales inválidas" }, // Mensaje genérico por seguridad
                { status: 401 }
            );
        }

        // Comparar contraseñas
        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Credenciales inválidas" }, // Mensaje genérico por seguridad
                { status: 401 }
            );
        }

        // Autenticación exitosa
        return NextResponse.json({
            user: {
                uuid: user.uuid,
                name: user.name,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Error en autenticación:', error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}