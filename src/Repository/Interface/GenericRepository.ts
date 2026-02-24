import { Injectable } from "@nestjs/common";
import { IGenericRepository } from "../Implementation/IGenericRepository";
import { Repository, ObjectLiteral  } from "typeorm";

@Injectable()
export class GenericRepository<T extends ObjectLiteral> implements IGenericRepository<T> {
    constructor(
        protected readonly repository: Repository<T>,
    ) {}

    async getByIdAsync(id: number): Promise<T | null> {
        return this.repository.findOne({ where: { id } as any});
    }

    async getAllAsync(): Promise<ReadonlyArray<T>> {
        return this.repository.find();
    }

    async addAsync(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    async updateAsync(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    async deleteAsync(entity: T): Promise<void> {
        await this.repository.remove(entity);
    }
}