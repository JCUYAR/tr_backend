import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../Interface/IUserRepository";
import { GenericRepository } from "./GenericRepository";
import { Repository } from "typeorm";
import { IsExistsUserResponse } from "src/Model/DTOs/Responses/User/IsExistsUserResponse";
import { User } from "src/Model/Entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IsExistsUserEndResponse } from "src/Model/DTOs/Responses/User/IsExistUserEndResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";

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
            username: user?.username,
            password: user?.us_password
        }
    }

    async existsByUsername(username: string): Promise<IsExistsUserResponse | null> {

        const user = await this.repository.findOne({
            where: { username },
            relations: ['role']
        });

        if (!user) return null;

        return {
            id: user?.id,
            username: user?.username,
            password: user?.us_password,
            role: user.role.description
        }
    }

    async findByIdEnd(id: number): Promise<IsExistsUserEndResponse | null> {
        const user = await this.repository.findOne({
            where: { id },
            relations: ['role']
        });

        if (!user) return null;
        return {
            id: user?.id,
            username: user?.username,
            name: user?.first_name,
            lName: user?.last_name,
            role: user?.role.description
        }
    }

    async listAllUsers(): Promise<BaseResult<SelectDto[]>> {

        const users = await this.repository.find({
            select: ['id', 'first_name', 'last_name']
        });

        const result: SelectDto[] = users.map(u => ({
            value: u.id.toString(),
            descript: `${u.first_name} ${u.last_name}`
        }));

        return BaseResult.ok(result);
    }
}