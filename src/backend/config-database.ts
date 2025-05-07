import { DataSource } from "typeorm";
import User from "./entities/User";
import Task from "./entities/Task";
import List from "./entities/List";

let connection: DataSource;

export async function getConnection(): Promise<DataSource> {
    if (!connection) {
        connection = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
<<<<<<< Updated upstream
            password: "itson",
=======
            password: "1234",
>>>>>>> Stashed changes
            database: "tasks_management_db",
            entities: [
                User, Task, List
            ],
            synchronize: true
        });
        await connection.initialize();
    }
    return connection;
}