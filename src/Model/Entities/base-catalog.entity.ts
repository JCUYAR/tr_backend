import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export abstract class BaseCatalogEntity {

  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}