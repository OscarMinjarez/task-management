import { getConnection } from "src/backend/config-database";
import { DataSource, Repository } from "typeorm";
import User from "src/backend/entities/User";
import CreateUserDto from "./dto/create-user-dto";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
let connection: DataSource;
let userRepository: Repository<User>;

export async function init() {
    if (!connection || !connection.isInitialized) {
        connection = await getConnection();
        userRepository = connection.getRepository(User);
    }
}

export async function getById(id: string): Promise<User | null> {
    await init();
    const users = await userRepository.find({
        where: {
            uuid: id
        },
        relations: {
            lists: {
                tasks: true
            }
        }
     });
     return users[0];
}

async function isUsernameTaken(username: string): Promise<boolean> {
    await init();
    const existingUser = await userRepository.findOneBy({ username });
    return !!existingUser;
}

export async function createUser(data: CreateUserDto): Promise<User> {
    const validationError = validateUserInput(data);
    if (validationError) {
        throw new Error(validationError);
    }

    if (await isUsernameTaken(data.username)) {
        throw new Error("El nombre de usuario ya está en uso");
    }

    await init();
    const newUser = new User();
    Object.assign(newUser, data);

    // Antes de guardar, encriptar la contraseña
    newUser.password = await hashPassword(data.password);

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

    if (
        !username || whitespaceRegex.test(username) ||
        !name || whitespaceRegex.test(name) ||
        !email || whitespaceRegex.test(email) ||
        !password || whitespaceRegex.test(password)
    ) {
        return "Todos los campos son requeridos y no deben estar vacíos";
    }

    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }

    if (/\d/.test(name)) {
        return "El nombre no debe contener números";
    }

    if (username.length > 15) {
        return "El username no debe tener más de 15 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "El email debe ser válido";
    }

    return null;
}

export async function recoverPasswordByEmail(email: string): Promise<string> {
    await init();

    const user = await userRepository.findOneBy({ email });

    if (!user) {
        throw new Error("Correo electrónico no encontrado");
    }

    return user.password;
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
}

// Función para encontrar un usuario por su email
export async function findUserByEmail(email: string): Promise<User | null> {
    await init();
    return await userRepository.findOne({ 
        where: { email },
        select: ["uuid", "name", "email", "username", "password"] 
    });
}

