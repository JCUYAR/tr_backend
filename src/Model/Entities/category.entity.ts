// import { Entity } from 'typeorm';
// import { BaseCatalogEntity } from './base-catalog.entity';

// @Entity({ name: 'category' })
// export class Category extends BaseCatalogEntity {}

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';

@Entity({ name: 'category' })
export class Category {
    @PrimaryGeneratedColumn('increment',{ type: 'int' })
    id!: number;
    
    @Column({ type: 'char', length: 5 })
    ca_key!: string;

    @Column({ type: 'varchar', length: 100 })
    description!: string;

    @ManyToOne(() => Area, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'area_id' })
    area!: Area;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
}