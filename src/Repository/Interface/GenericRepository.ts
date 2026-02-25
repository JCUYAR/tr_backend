import { Injectable } from "@nestjs/common";
import { IGenericRepository } from "../Implementation/IGenericRepository";
import { Repository, ObjectLiteral, FindOptionsWhere  } from "typeorm";

@Injectable()
export class GenericRepository<T extends ObjectLiteral> implements IGenericRepository<T> {
    constructor(
        protected readonly repository: Repository<T>,
    ) {}

    async findOneBy(condition: FindOptionsWhere<T>): Promise<T | null> {
        return await this.repository.findOne({ where: condition });
    }

    async addAsync(entity: T): Promise<T> {
        return await this.repository.save(entity);
    }

    async updateAsync(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    async deleteAsync(entity: T): Promise<void> {
        await this.repository.remove(entity);
    }
}