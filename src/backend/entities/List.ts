import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Task from "./Task";


@Entity({name: "lists"})
export default class List{

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({name:"name", type: "varchar", length: 50, nullable: false})
    name: string;

    @Column({name:"state", type: "varchar", nullable: true})
    color: string;

    @ManyToOne(() => User, user => user.lists)
    user: User;

    @OneToMany(() => Task, task => task.list)
    tasks: Array<Task>;
}