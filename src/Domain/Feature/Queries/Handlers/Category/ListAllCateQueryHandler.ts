import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListAllCateQuery } from "../../Requests/Category/ListAllCateQuery";
import { Inject } from "@nestjs/common";
import { ICategoryRepository } from "src/Repository/Interface/ICategoryRepository";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";


@QueryHandler(ListAllCateQuery)
export class ListAllCateQueryHandler 
    implements IQueryHandler<ListAllCateQuery> {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
    ) {}

    async execute(): Promise<BaseResult<SelectDto[]>> {
        return await this.categoryRepository.listAllCate();
    }
}