import { getConnection } from "src/backend/config-database";
import { DataSource, Repository } from "typeorm";
import CreateTaskDto from "./dto/create-task-dto";
import Task from "src/backend/entities/Task";

let connection: DataSource;
let taskRepository: Repository<Task>;

export async function init() {
    connection = await getConnection();
    taskRepository = connection.getRepository(Task);
}

export async function findAll(): Promise<Task[]> {
    await init();
    return await taskRepository.find({
        order: {
            dateCreation: "ASC"
        }
    });
}

export async function create(tasks: CreateTaskDto): Promise<Task> {
    await init();
    const newTask = new Task();
    Object.assign(newTask, tasks);
    return await taskRepository.save(newTask);
}