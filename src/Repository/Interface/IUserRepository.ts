import { User } from "src/Model/Entities/user.entity";
import { IGenericRepository } from "./IGenericRepository";
import { IsExistsUserResponse } from "src/Model/DTOs/Responses/User/IsExistsUserResponse";
import { IsExistsUserEndResponse } from "src/Model/DTOs/Responses/User/IsExistUserEndResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";


export interface IUserRepository extends IGenericRepository<User> {
    findById(id: number): Promise<IsExistsUserResponse | null>;

    existsByUsername(username: string): Promise<IsExistsUserResponse | null>

    findByIdEnd(id: number): Promise<IsExistsUserEndResponse | null>

    listAllUsers(): Promise<BaseResult<SelectDto[]>>
}