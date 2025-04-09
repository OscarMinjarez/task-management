import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tasks"})
export default class Task{

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({name:"title", type: "varchar", length: 50, nullable: false})
    title: string;

    @Column({name:"description", type: "varchar", length: 250, nullable: true})
    description: string;

    @Column({name:"state", type: "varchar", nullable: true})
    state: string;

    @CreateDateColumn({type: "timestamp", nullable: true})
    dateCreation: Date;

    @Column({type: "timestamp", nullable: true})
    dateLimit: Date;

}