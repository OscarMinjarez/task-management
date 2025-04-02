import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Task"})
export default class Task{

    @PrimaryGeneratedColumn({name:"_idTask"})
    id ?: bigint;

    @Column({name:"title", nullable: true})
    title: string;

    @Column({name:"description"})
    description: string;

    @Column({name:"state", nullable: true})
    state: string;

    @Column({name:"dateCreation", nullable: true})
    dateCreation: Date;

    @Column({name:"dateLimit", nullable: true})
    dateLimit: Date;

}