import { Category } from "src/Model/Entities/category.entity";
import { IGenericRepository } from "./IGenericRepository";
import { IsExistsCategoryResponse } from "src/Model/DTOs/Responses/Category/IsExistsCategoryResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";


export interface ICategoryRepository extends IGenericRepository<Category> {
    existsByDescription(description: string): Promise<boolean>

    findById(id: number): Promise<IsExistsCategoryResponse | null>;

    listAllCate(): Promise<BaseResult<SelectDto[]>>
}