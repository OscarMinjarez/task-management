import typeorm, { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "User"})
export default class User{

    @PrimaryGeneratedColumn({name:"_idTask"})
    id ?: bigint;

    @Column({name:"username",  unique: true, nullable: true})
    username: string;

    @Column({name:"name", nullable: true})
    name: string;
    
    @Column({name:"email", unique: true, nullable: true})
    email: string;

    @Column({name:"password", nullable: true})
    password: string;



}