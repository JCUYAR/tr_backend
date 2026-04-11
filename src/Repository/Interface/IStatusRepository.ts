import { IsExistsStatusResponse } from "src/Model/DTOs/Responses/Status/IsExistsStatusResponse";
import { IGenericRepository } from "./IGenericRepository";
import { Status } from "src/Model/Entities/status.entity";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";


export interface IStatusRepository extends IGenericRepository<Status> {
    existsByDescription(description: string): Promise<boolean>

    findById(id: number): Promise<IsExistsStatusResponse | null>;

    listAllStatus(): Promise<BaseResult<SelectDto[]>>
}