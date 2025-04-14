import { getConnection } from "src/backend/config-database";
import { DataSource, Repository } from "typeorm";
import User from "src/backend/entities/User";
import CreateUserDto from "./dto/create-user-dto";

let connection: DataSource;
let userRepository: Repository<User>;

export async function init() {
    connection = await getConnection();
    userRepository = connection.getRepository(User);
}

export async function createUser(data: CreateUserDto): Promise<User> {
    const validationError = validateUserInput(data);
    if (validationError) {
        throw new Error(validationError);
    }

    await init();
    const newUser = new User();
    Object.assign(newUser, data);
    return await userRepository.save(newUser);
}


export async function findAllUsers(): Promise<User[]> {
    await init();
    return await userRepository.find({
        order: { name: "ASC" }
    });
}

function validateUserInput(data: CreateUserDto): string | null {
    const { username, name, email, password } = data;

    const whitespaceRegex = /^\s*$/;

    // Verificar campos vacíos o sólo con espacios
    if (
        !username || whitespaceRegex.test(username) ||
        !name || whitespaceRegex.test(name) ||
        !email || whitespaceRegex.test(email) ||
        !password || whitespaceRegex.test(password)
    ) {
        return "Todos los campos son requeridos y no deben estar vacíos";
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }

    // Validar que el nombre no contenga números
    if (/\d/.test(name)) {
        return "El nombre no debe contener números";
    }

    // Validar que el username no supere los 15 caracteres
    if (username.length > 15) {
        return "El username no debe tener más de 15 caracteres";
    }

    // Validar formato de email (sencillo)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "El email debe ser válido";
    }

    return null; // Todo bien
}

export async function recoverPasswordByEmail(email: string): Promise<string> {
    await init();

    const user = await userRepository.findOneBy({ email });

    if (!user) {
        throw new Error("Correo electrónico no encontrado");
    }

    return user.password; // ⚠️ Inseguro en la vida real
}


