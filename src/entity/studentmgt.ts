import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class studentmgt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    grade: string;

    @Column()
    batchno: string;


    @Column()
    indexNo: string;

    @Column()
    email: string;


    @Column()
    image: string;

    @Column()
    isDisabled: boolean = false;

}