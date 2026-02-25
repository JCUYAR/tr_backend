import { Category } from "src/Model/Entities/category.entity";
import { IGenericRepository } from "./IGenericRepository";

export interface ICategoryRepository extends IGenericRepository<Category> {
    existsByDescription(description: string): Promise<boolean>

}