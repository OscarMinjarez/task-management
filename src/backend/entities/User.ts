import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import List from "./List";

@Entity({name: "users"})
export default class User {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({name:"username", type: "varchar", unique: true, nullable: true})
    username: string;

    @Column({name:"name", type: "varchar", nullable: true})
    name: string;
    
    @Column({name:"email", type: "varchar", unique: true, nullable: true})
    email: string;

    @Column({name:"password", type: "varchar", nullable: true})
    password: string;

    @OneToMany(() => List, list => list.user)
    lists: Array<List>;
}