import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericRepository } from "./GenericRepository";
import { IAreaRepository } from "../Interface/IAreaRepository";
import { Area } from "src/Model/Entities/area.entity";
import { IsExistsAreaResponse } from "src/Model/DTOs/Responses/Area/IsExistsAreaResponse";

@Injectable()
export class AreaRepository extends GenericRepository<Area> implements IAreaRepository{
    constructor(
        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>,
    ) {
        super(areaRepository)
    }
    async existsByDescription(description: string): Promise<boolean> {
        const category = await this.findOneBy({ description });
        return !!category;
    }

    async findById(id: number): Promise<IsExistsAreaResponse | null> {
        const user = await this.findOneBy({ id });
        if (!user) return null;
        return {
            id: user?.id,
            description: user?.description
        }
    }
}