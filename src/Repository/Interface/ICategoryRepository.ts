import { Category } from "src/Model/Entities/category.entity";
import { IGenericRepository } from "./IGenericRepository";
import { IsExistsCategoryResponse } from "src/Model/DTOs/Responses/Category/IsExistsCategoryResponse";


export interface ICategoryRepository extends IGenericRepository<Category> {
    existsByDescription(description: string): Promise<boolean>

    findById(id: number): Promise<IsExistsCategoryResponse | null>;
}