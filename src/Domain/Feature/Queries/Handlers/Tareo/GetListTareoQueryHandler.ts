import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetListTareoQuery } from "../../Requests/Tareo/GetListTareoQuery";
import type { ITareoRepository } from "src/Repository/Interface/ITareoRepository";
import { Inject } from "@nestjs/common";
import { GetListTareoResponse } from "src/Model/DTOs/Responses/Tareo/GetListTareoResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";

@QueryHandler(GetListTareoQuery)
export class GetListTareoQueryHandler 
    implements IQueryHandler<GetListTareoQuery> {
    constructor(
        @Inject('ITareoRepository')
        private readonly tareoRepository: ITareoRepository,
    ) {}

    async execute(): Promise<BaseResult<GetListTareoResponse[]>> {
        return await this.tareoRepository.findAllWithRelations();
    }
}