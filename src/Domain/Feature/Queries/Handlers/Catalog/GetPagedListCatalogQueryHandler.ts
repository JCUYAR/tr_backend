import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPagedListCatalogQuery } from "src/Domain/Feature/Queries/Requests/Catalog/GetPagedListCatalogQuery";
import { ListCatalogResponse } from "src/Model/DTOs/Responses/Catalog/ListCatalogResponse";
import { PagedResponse } from "src/Model/Wrappers/PagedResponseDto";
import { AreaRepository } from "src/Repository/Implementation/AreaRepository";
import { StatusRepository } from "src/Repository/Implementation/StatusRepository";
import { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import { IStatusRepository } from "src/Repository/Interface/IStatusRepository";


@QueryHandler(GetPagedListCatalogQuery)
export class GetPagedListCatalogQueryHandler
    implements IQueryHandler<GetPagedListCatalogQuery> {
    constructor(
        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,

        @Inject('IStatusRepository')
        private readonly statusRepository: IStatusRepository,
    ) { }

    async execute(
        query: GetPagedListCatalogQuery
    ): Promise<PagedResponse<ListCatalogResponse>> {
        console.log("Entró al handler");
        var result;
        console.log(query);
        switch (query.type) {
            case "1":
                result = await this.areaRepository.getPagedListArea(
                    query.pageNumber,
                    query.pageSize,
                    query.description
                );
                break;

            case "2":
                result = await this.statusRepository.getPagedListStatus(
                    query.pageNumber,
                    query.pageSize,
                    query.description
                );
                break;
        }

        return new PagedResponse(result, query)

    }
}