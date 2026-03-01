import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../Interface/IUserRepository";
import { GenericRepository } from "./GenericRepository";
import { User } from "src/Model/Entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IsExistsUserResponse } from "src/Model/DTOs/Responses/User/IsExistsUserResponse";

@Injectable()
export class UserRepository extends GenericRepository<User> implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
    async findById(id: number): Promise<IsExistsUserResponse | null> {
        const user = await this.findOneBy({ id });
        if (!user) return null;
        return {
            id: user?.id,
            username: user?.username
        }
    }
}