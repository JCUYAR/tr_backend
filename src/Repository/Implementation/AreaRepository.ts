import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericRepository } from "./GenericRepository";
import { IAreaRepository } from "../Interface/IAreaRepository";
import { Area } from "src/Model/Entities/area.entity";

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
}