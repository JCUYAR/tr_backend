import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetListTareoQuery } from "../Requests/GetListTareoQuery";
import type { ITareoRepository } from "src/Repository/Interface/ITareoRepository";
import { Inject } from "@nestjs/common";
import { GetListTareoResponse } from "src/Model/DTOs/Responses/Tareo/GetListTareoResponse";

@QueryHandler(GetListTareoQuery)
export class GetListTareoQueryHandler implements IQueryHandler<GetListTareoQuery> {
    constructor(
        @Inject('ITareoRepository')
        private readonly tareoRepository: ITareoRepository,
    ) {}

    async execute(): Promise<GetListTareoResponse[]> {
        return await this.tareoRepository.findAllWithRelations();
    }
}