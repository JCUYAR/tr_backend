import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Area } from "./area.entity";
import { Status } from "./status.entity";

@Entity({ name: 'tareo' })
export class Tareo {
    @PrimaryGeneratedColumn('increment', { type: 'int' })
    id: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Category, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Area, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'area_id' })
    area: Area;

    @ManyToOne(() => Status, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'status_id' })
    status: Status;

    // ======================
    // CAMPOS SIMPLES
    // ======================

    @Column({ type: 'date' })
    work_date: Date;

    @Column({ type: 'time' })
    start_time: string;

    @Column({ type: 'time' })
    end_time: string;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    total_hours: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

}