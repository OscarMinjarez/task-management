import { getConnection } from "src/backend/config-database";
import { Between, DataSource, Repository, Equal } from "typeorm";
import CreateTaskDto from "./dto/create-task-dto";
import Task from "src/backend/entities/Task";
import List from "src/backend/entities/List";

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
        },
        relations: {
            list: true
        }
    });
}

export async function create(tasks: CreateTaskDto): Promise<Task> {
    await init();
    const newTask = new Task();
    Object.assign(newTask, tasks);
    return await taskRepository.save(newTask);
}
export async function updateTaskState(uuid: string, newState: "completado" | "en proceso" | "pendiente"): Promise<Task | null> {
    await init();
    const task = await taskRepository.findOneBy({ uuid });

    if (!task) {
        return null;
    }

    
    if (task.state === newState) {
        return task; // ya está actualizado
    }

    task.state = newState;
    return await taskRepository.save(task);
}
export async function findById(uuid: string): Promise<Task | null> {
    await init();
    return await taskRepository.findOneBy({ uuid });
}

export async function findByTwoDates(dateStart: Date, dateEnd: Date): Promise< Task[]>{

    await init();

    const dateStartOne = new Date(dateStart.toISOString().split('T')[0]);
    const dateEndOne = new Date(dateEnd.toISOString().split('T')[0]);

    return await taskRepository.find({
        where: {
            dateCreation: Between(dateStartOne, dateEndOne)
        }
    });

}

export async function findByOneDate(date: Date): Promise< Task[]>{

    await init();

    const dateString = new Date(date.toISOString().split('T')[0]);
    
    return await taskRepository.find({

        where: {

            dateLimit: Equal(dateString)

        }

    })

}

export async function updateTask(
    uuid: string,
    data: Partial<Pick<Task, "title" | "description" | "state" | "dateLimit">> & { list?: string }
): Promise<Task | null> {
    await init();
    const task = await taskRepository.findOne({
        where: { uuid },
        relations: ['list'],
    });

    if (!task) return null;

    Object.assign(task, data);

    if (data.list) {
        const listRepo = connection.getRepository(List);
        const newList = await listRepo.findOneBy({ name: data.list });
        if (newList) {
            task.list = newList;
        } else {
            console.warn(`Lista "${data.list}" no encontrada`);
        }
    }

    return await taskRepository.save(task);
}

export async function deleteTask(uuid: string): Promise<boolean> {
    await init();
    const result = await taskRepository.delete({ uuid });
    return result.affected !== 0;
}




