import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string | null;

    @Column({ nullable: true })
    name: string | null;

    @Column({ nullable: true, unique: true })
    googleId: string | null;
}
