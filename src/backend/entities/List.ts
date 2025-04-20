import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "lists"})
export default class List{
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({name:"name", type: "varchar", length: 50, nullable: false})
    name: string;

    @Column({name:"state", type: "varchar", nullable: true})
    color: string;  

}