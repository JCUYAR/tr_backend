import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericRepository } from "./GenericRepository";
import { IAreaRepository } from "../Interface/IAreaRepository";
import { Area } from "src/Model/Entities/area.entity";
import { IsExistsAreaResponse } from "src/Model/DTOs/Responses/Area/IsExistsAreaResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";

@Injectable()
export class AreaRepository extends GenericRepository<Area> implements IAreaRepository {
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

    async listAllArea(): Promise<BaseResult<SelectDto>> {
        const area = await this.repository.find({
            select: ['id', 'description']
        });

        const result: SelectDto[] = area.map(u => ({
            value: u.id.toString(),
            descript: u.description.toString()
        }));

        return BaseResult.ok(result);
    }
}