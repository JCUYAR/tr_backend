import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericRepository } from "./GenericRepository";
import { IStatusRepository } from "../Interface/IStatusRepository";
import { Status } from "src/Model/Entities/status.entity";
import { IsExistsStatusResponse } from "src/Model/DTOs/Responses/Status/IsExistsStatusResponse";

@Injectable()
export class StatusRepository extends GenericRepository<Status> implements IStatusRepository{
    constructor(
        @InjectRepository(Status)
        private readonly statusRepository: Repository<Status>,
    ) {
        super(statusRepository)
    }
    async existsByDescription(description: string): Promise<boolean> {
        const category = await this.findOneBy({ description });
        return !!category;
    }

    async findById(id: number): Promise<IsExistsStatusResponse | null> {
        const status = await this.findOneBy({ id });
        if (!status) return null;
        return {
            id: status.id,
            description: status.description
        }
    }
}