import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListCatalogResponse } from "src/Model/DTOs/Responses/Catalog/ListCatalogResponse";
import { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import { IStatusRepository } from "src/Repository/Interface/IStatusRepository";
import { GetCatalogByIdQuery } from "../../Requests/Catalog/GetCatalogByIdQuery";
import { BaseResult } from "src/Model/Wrappers/BaseResult";


@QueryHandler(GetCatalogByIdQuery)
export class GetCatalogByIdQueryHandler
    implements IQueryHandler<GetCatalogByIdQuery> {
    constructor(
        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,

        @Inject('IStatusRepository')
        private readonly statusRepository: IStatusRepository,
    ) { }

    async execute(
        query: GetCatalogByIdQuery
    ): Promise<BaseResult<ListCatalogResponse[]>> {
        var result;
        switch (query.type) {
            case "1":
                result = await this.areaRepository.findById(
                    parseInt(query.id)
                );
                break;

            case "2":
                result = await this.statusRepository.findById(
                    parseInt(query.id)
                );
                break;
        }

        return BaseResult.ok([result])

    }
}