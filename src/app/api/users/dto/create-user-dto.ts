export default class CreateUserDto {
    uuid: string;
    name: string;
    email: string;
    username: string;
    lists: {
        id: number;
        name: string;
        color: string;
        tasks: {
            id: number;
            title: string;
        }[];
    }[];
}