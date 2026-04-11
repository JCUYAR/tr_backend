import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListAllAreaQuery } from "../../Requests/Area/ListAllAreaQuery";
import { Inject } from "@nestjs/common";
import { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import { SelectDto } from "src/Model/Wrappers/SelectDto";
import { BaseResult } from "src/Model/Wrappers/BaseResult";


@QueryHandler(ListAllAreaQuery)
export class ListAllAreaQueryHandler 
    implements IQueryHandler<ListAllAreaQuery> {
    constructor(
        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,
    ) {}

    async execute(): Promise<BaseResult<SelectDto[]>> {
        return await this.areaRepository.listAllArea();
    }
}