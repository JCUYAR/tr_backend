import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    username: string;
    
    @Column({ type: 'varchar', length: 20 })
    document_number: string;  

    @Column({ type: 'varchar', length: 60 })
    us_password: string;

    @Column({ type: 'varchar', length: 100 })
    first_name: string; 

    @Column({ type: 'varchar', length: 100 })
    last_name: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

}