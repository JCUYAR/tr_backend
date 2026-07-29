import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericRepository } from "./GenericRepository";
import { IStatusRepository } from "../Interface/IStatusRepository";
import { Status } from "src/Model/Entities/status.entity";
import { IsExistsStatusResponse } from "src/Model/DTOs/Responses/Status/IsExistsStatusResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { SelectDto } from "src/Model/Wrappers/SelectDto";
import { ListCatalogResponse } from "src/Model/DTOs/Responses/Catalog/ListCatalogResponse";
import { PaginationResponseDto } from "src/Model/Wrappers/PaginationResponseDto";

@Injectable()
export class StatusRepository extends GenericRepository<Status> implements IStatusRepository {
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

    async listAllStatus(): Promise<BaseResult<SelectDto[]>> {
        const status = await this.repository.find({
            select: ['id', 'description']
        });

        const result: SelectDto[] = status.map(u => ({
            value: u.id.toString(),
            descript: u.description.toString()
        }));

        return BaseResult.ok(result);
    }

    async getPagedListStatus(
        pageNumber: number,
        pageSize: number,
        search?: string
    ): Promise<PaginationResponseDto<ListCatalogResponse>> {
        const statusTable = this.repository.createQueryBuilder('st');

        const regStartsWith = await statusTable
            .clone()
            .where('st.description LIKE :search', {
                search: `${search ?? ''}%`,
            })
            .getCount();

        let finalQuery = this.repository.createQueryBuilder('st');


        if (regStartsWith > 0) {
            finalQuery.where(
                'st.description LIKE :search',
                {
                    search: `${search ?? ''}%`
                }
            ).select([
                'st.id AS id',
                'st.description AS description',
            ]);
        } else {
            finalQuery
                .select([
                    'st.id AS id',
                    'st.description AS description',
                ]);
        }

        finalQuery.orderBy('st.id', 'ASC');

        const total = await finalQuery.clone().getCount();

        const rows = await finalQuery
            .skip((pageNumber - 1) * pageSize)
            .take(pageSize)
            .getRawMany<ListCatalogResponse>();

        return new PaginationResponseDto(rows, total);
    }
}