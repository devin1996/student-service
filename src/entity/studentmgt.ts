import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class studentmgt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "name"})
    name: string;

    @Column({default: "grade"})
    grade: string;

    @Column({default: "17.1"})
    batchno: string;

    @Column({default: "0000000"})
    indexNo: string;

    @Column({default: "email@sample.com"})
    email: string;


    @Column({default: "profile_picture"})
    image: string;

    @Column()
    isDisabled: boolean = false;

}