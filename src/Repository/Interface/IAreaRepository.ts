import { Area } from "src/Model/Entities/area.entity";
import { IGenericRepository } from "./IGenericRepository";
import { IsExistsAreaResponse } from "src/Model/DTOs/Responses/Area/IsExistsAreaResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";


export interface IAreaRepository extends IGenericRepository<Area> {
    existsByDescription(description: string): Promise<boolean>

    findById(id: number): Promise<IsExistsAreaResponse | null>;

    listAllArea(): Promise<BaseResult<SelectDto>>
}