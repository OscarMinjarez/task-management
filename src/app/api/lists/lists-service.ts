import { getConnection } from "src/backend/config-database";
import { DataSource, Repository } from "typeorm";
import List from "src/backend/entities/List";
import CreateListDto from "./dto/create-list-dto";
import User from "src/backend/entities/User";

let connection: DataSource;
let listRepository: Repository<List>;

export async function init() {
    connection = await getConnection();
    listRepository = connection.getRepository(List);
}

export async function createList(data: CreateListDto): Promise<List> {
    const validationError = validateListInput(data);
    if (validationError) {
        throw new Error(validationError);
    }
    await init();
    const newList = new List();
    newList.name = data.name;
    newList.color = data.color;
    newList.user = { uuid: data.userUuid } as User;
    if (data.tasks) {
        newList.tasks = data.tasks;
    }
    return await listRepository.save(newList);
}

export async function editList(
    uuid: string,
    data: Partial<Pick<List, "name" | "color" | "tasks">> & { userUuid?: string }
): Promise<List | null> {
    await init();
    const list = await listRepository.findOneBy({ uuid });
    if (!list) return null;
    if (data.name) list.name = data.name;
    if (data.color) list.color = data.color;
    if (data.tasks) list.tasks = data.tasks;
    if (data.userUuid) {
        list.user = { uuid: data.userUuid } as User;
    }
    return await listRepository.save(list);
}

export async function findByUserUuid(userUuid: string): Promise<List[]> {
    await init();
    return await listRepository.find({
        where: { user: { uuid: userUuid } },
        order: { name: "ASC" }
    });
}

export async function findAllLists(): Promise<List[]> {
    await init();
    return await listRepository.find({
        order: { name: "ASC" }
    });
}

function validateListInput(data: CreateListDto): string | null {
    const { name, color} = data;
    const whitespaceRegex = /^\s*$/;
    if (
        !name || whitespaceRegex.test(name) ||
        !color || whitespaceRegex.test(color)
    ) {
        return "Todos los campos son requeridos y no deben estar vacíos";
    }
    if (color.length > 6) {
        return "El codigo de color Hex no debe tener más de 6 caracteres";
    }
    return null;
}

export async function deleteList(uuid: string): Promise<boolean> {
    await init();
    const result = await listRepository.delete({ uuid });
    return result.affected !== 0;
}

export async function findById(uuid: string): Promise<List | null> {
    await init();
    return await listRepository.findOneBy({ uuid });
}