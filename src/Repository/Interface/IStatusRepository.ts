import { IsExistsStatusResponse } from "src/Model/DTOs/Responses/Status/IsExistsStatusResponse";
import { IGenericRepository } from "./IGenericRepository";
import { Status } from "src/Model/Entities/status.entity";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";
import { PaginationResponseDto } from "src/Model/Wrappers/PaginationResponseDto";
import { ListCatalogResponse } from "src/Model/DTOs/Responses/Catalog/ListCatalogResponse";


export interface IStatusRepository extends IGenericRepository<Status> {
    existsByDescription(description: string): Promise<boolean>

    findById(id: number): Promise<IsExistsStatusResponse | null>;

    listAllStatus(): Promise<BaseResult<SelectDto[]>>

    getPagedListStatus(
        pageNumber: number,
        pageSize: number,
        search?: string
    ): Promise<PaginationResponseDto<ListCatalogResponse>>
}