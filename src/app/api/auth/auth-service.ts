import { getConnection } from "src/backend/config-database";
import User from "src/backend/entities/User";
import { DataSource, Repository } from "typeorm";

let connection: DataSource;
let userRepository: Repository<User>;

export async function init() {
    connection = await getConnection();
    userRepository = connection.getRepository(User);
}

export async function login(email: string, password: string): Promise<User> {
    await init();
    const user = await userRepository.findOneBy({
        email
    });
    if (!user) {
        throw new Error("Usuario no encontrado.");
    }
    if (password !== user.password) {
        throw new Error("Credenciales inválidas.");
    }
    return user;
}