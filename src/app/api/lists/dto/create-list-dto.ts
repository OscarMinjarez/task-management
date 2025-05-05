import User from "src/backend/entities/User";
import Task from "src/backend/entities/Task";

export default class CreateListDto {
    name: string;
    color: string;
    user: User;
    tasks: Array<Task>;
}