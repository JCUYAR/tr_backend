import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    username: string;
    
    @Column({ type: 'varchar', length: 20 })
    document_number: string;  

    @Column({ type: 'varchar', length: 100 })
    first_name: string; 

    @Column({ type: 'varchar', length: 100 })
    last_name: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

}