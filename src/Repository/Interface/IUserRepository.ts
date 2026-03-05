import { User } from "src/Model/Entities/user.entity";
import { IGenericRepository } from "./IGenericRepository";
import { IsExistsUserResponse } from "src/Model/DTOs/Responses/User/IsExistsUserResponse";


export interface IUserRepository extends IGenericRepository<User> {
    findById(id: number): Promise<IsExistsUserResponse | null>;

    existsByUsername(description: string): Promise<boolean>

}