import { Entity } from "typeorm";
import { BaseCatalogEntity } from "./base-catalog.entity";

@Entity({ name: 'role' })
export class Role extends BaseCatalogEntity {}