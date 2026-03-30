import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserDataQuery } from "../../Requests/Users/GetUserDataQuery";
import { Inject } from "@nestjs/common";
import { IUserRepository } from "src/Repository/Interface/IUserRepository";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { IsExistsUserEndResponse } from "src/Model/DTOs/Responses/User/IsExistUserEndResponse";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";

@QueryHandler(GetUserDataQuery)
export class GetUserDataQueryHandler
    implements IQueryHandler<GetUserDataQuery> {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(
        request: GetUserDataQuery,
    ): Promise<BaseResult<IsExistsUserEndResponse>> {

        const user = await this.userRepository.findByIdEnd(request.id);

        if (!user) {
            return BaseResult.fail(
                new AppError(
                    ErrorCode.NotFound,
                    'User not found',
                    'user',
                ),
            );
        }

        return BaseResult.ok([user]);
    }
}