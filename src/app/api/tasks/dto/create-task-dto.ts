export default class CreateTaskDto {

    title: string;
    description: string;
    state: "completado" | "en proceso" | "pendiente";
    dateLimit: Date;
}