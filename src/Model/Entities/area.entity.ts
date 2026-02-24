import { Entity } from 'typeorm';
import { BaseCatalogEntity } from './base-catalog.entity';

@Entity({ name: 'area' })
export class Area extends BaseCatalogEntity {}