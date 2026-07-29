import { Area } from "src/Model/Entities/area.entity";
import { IGenericRepository } from "./IGenericRepository";
import { IsExistsAreaResponse } from "src/Model/DTOs/Responses/Area/IsExistsAreaResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";
import { PaginationResponseDto } from "src/Model/Wrappers/PaginationResponseDto";
import { ListCatalogResponse } from "src/Model/DTOs/Responses/Catalog/ListCatalogResponse";


export interface IAreaRepository extends IGenericRepository<Area> {
    existsByDescription(description: string): Promise<boolean>

    findById(id: number): Promise<IsExistsAreaResponse | null>;

    listAllArea(): Promise<BaseResult<SelectDto[]>>

    getPagedListArea(
        pageNumber: number,
        pageSize: number,
        search?: string
    ): Promise<PaginationResponseDto<ListCatalogResponse>>
}