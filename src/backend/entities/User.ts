import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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



}