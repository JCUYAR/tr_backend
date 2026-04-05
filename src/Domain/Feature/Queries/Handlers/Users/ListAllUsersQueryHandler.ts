import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListAllUsersQuery } from "../../Requests/Users/ListAllUsersQuery";
import { Inject } from "@nestjs/common";
import { IUserRepository } from "src/Repository/Interface/IUserRepository";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";

@QueryHandler(ListAllUsersQuery)
export class ListAllUsersQueryHandler 
    implements IQueryHandler<ListAllUsersQuery> {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(): Promise<BaseResult<SelectDto>> {
        return await this.userRepository.listAllUsers();
    }
}