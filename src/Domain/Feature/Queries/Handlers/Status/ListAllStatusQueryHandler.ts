import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListAllStatusQuery } from "../../Requests/Status/ListAllStatusQuery";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";
import { IStatusRepository } from "src/Repository/Interface/IStatusRepository";
import { Inject } from "@nestjs/common";

@QueryHandler(ListAllStatusQuery)
export class ListAllStatusQueryHandler 
    implements IQueryHandler<ListAllStatusQuery> {
    constructor(
        @Inject('IStatusRepository')
        private readonly statusRepository: IStatusRepository,
    ) {}

    async execute(): Promise<BaseResult<SelectDto[]>> {
        return await this.statusRepository.listAllStatus();
    }
}