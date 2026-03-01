import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import type { ITareoRepository } from "src/Repository/Interface/ITareoRepository";
import { Inject } from "@nestjs/common";
import { GetListTareoResponse } from "src/Model/DTOs/Responses/Tareo/GetListTareoResponse";
import { GetListTareoByUserQuery } from "../../Requests/Tareo/GetListTareoByUserQuery";

@QueryHandler(GetListTareoByUserQuery)
export class GetListTareoByUserQueryHandler 
    implements IQueryHandler<GetListTareoByUserQuery> {
    constructor(
        @Inject('ITareoRepository')
        private readonly tareoRepository: ITareoRepository,
    ) {}

    async execute(parameter: GetListTareoByUserQuery,
    ): Promise<GetListTareoResponse[]> {
        return await this.tareoRepository.findByUser(parameter.id);
    }
}