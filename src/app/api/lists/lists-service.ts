import { getConnection } from "src/backend/config-database";
import { DataSource, Repository } from "typeorm";
import List from "src/backend/entities/List";
import CreateListDto from "./dto/create-list-dto";

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
    Object.assign(newList, data);
    return await listRepository.save(newList);
}

export async function editList(uuid: string ,data: Partial<Pick<List, "name" | "color">>): Promise<List | null> {
    await init();

    const list = await listRepository.findOneBy({ uuid });

    if (!list) return null;
    Object.assign(list, data);
    return await listRepository.save(list);
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
    const hexCodeRegex = /^\s*$/;

    // Verificar campos vacíos o sólo con espacios
    if (
        !name || whitespaceRegex.test(name) ||
        !color || whitespaceRegex.test(color)
    ) {
        return "Todos los campos son requeridos y no deben estar vacíos";
    }

    // Validar que codigo de color hex no sea mayor de 6 caracteres
    if (color.length > 6) {
        return "El codigo de color Hex no debe tener más de 6 caracteres";
    }

    return null; // Todo bien
}

export async function deleteList(uuid: string): Promise<boolean> {
    await init();
    const result = await listRepository.delete({ uuid });
    return result.affected !== 0;
}

