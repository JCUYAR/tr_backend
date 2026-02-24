import { Entity } from 'typeorm';
import { BaseCatalogEntity } from './base-catalog.entity';

@Entity({ name: 'status' })
export class Status extends BaseCatalogEntity {}