import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericRepository } from "./GenericRepository";
import { IAreaRepository } from "../Interface/IAreaRepository";
import { Area } from "src/Model/Entities/area.entity";
import { IsExistsAreaResponse } from "src/Model/DTOs/Responses/Area/IsExistsAreaResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";
import { PaginationResponseDto } from "src/Model/Wrappers/PaginationResponseDto";
import { ListCatalogResponse } from "src/Model/DTOs/Responses/Catalog/ListCatalogResponse";

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

    async listAllArea(): Promise<BaseResult<SelectDto[]>> {
        const area = await this.repository.find({
            select: ['id', 'description']
        });

        const result: SelectDto[] = area.map(u => ({
            value: u.id.toString(),
            descript: u.description.toString()
        }));

        return BaseResult.ok(result);
    }

    async getPagedListArea(
        pageNumber: number,
        pageSize: number,
        search?: string
    ): Promise<PaginationResponseDto<ListCatalogResponse>> {
        const areaTable = this.repository.createQueryBuilder('ar');

        const regStartsWith = await areaTable
            .clone()
            .where('ar.description LIKE :search', {
                search: `${search ?? ''}%`,
            })
            .getCount();

        let finalQuery = this.repository.createQueryBuilder('ar');


        if (regStartsWith > 0) {
            finalQuery.where(
                'ar.description LIKE :search',
                {
                    search: `${search ?? ''}%`
                }
            ).select([
                'ar.id AS id',
                'ar.description AS description',
            ]);
        } else {
            finalQuery
                .select([
                    'ar.id AS id',
                    'ar.description AS description',
                ]);
        }

        finalQuery.orderBy('ar.id', 'ASC');

        const total = await finalQuery.clone().getCount();

        const rows = await finalQuery
            .skip((pageNumber - 1) * pageSize)
            .take(pageSize)
            .getRawMany<ListCatalogResponse>();

        return new PaginationResponseDto(rows, total);
    }
}