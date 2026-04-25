import { InjectRepository } from "@nestjs/typeorm";
import { ITareoRepository } from "../Interface/ITareoRepository";
import { Repository } from "typeorm";
import { Tareo } from "src/Model/Entities/tareo.entity";
import { GetListTareoResponse } from "src/Model/DTOs/Responses/Tareo/GetListTareoResponse";
import { Injectable } from "@nestjs/common";
import { GenericRepository } from "./GenericRepository";
import { BaseResult } from "src/Model/Wrappers/BaseResult";

@Injectable()
export class TareoRepository extends GenericRepository<Tareo> implements ITareoRepository {
    constructor(
        @InjectRepository(Tareo)
        repository: Repository<Tareo>,
    ) {
        super(repository)

    }

    async findAllWithRelations(): Promise<BaseResult<GetListTareoResponse[]>> {
        const result = await this.repository
            .createQueryBuilder('t')
            .select([
                't.id as id',
                't.tareo_code as tareoCode',
                't.work_date as workDate',
                't.description as description',
                't.start_time as startTime',
                't.end_time as endTime',
                't.total_hours as totalHours',
                't.user_id as user_id',
                't.category_id as category',
                't.area_id as area',
                't.status_id as status',
            ])
            .getRawMany();

        return BaseResult.ok(result);
    }

    async findByUser(userId: number): Promise<BaseResult<GetListTareoResponse[]>> {
        const result =  await this.repository
            .createQueryBuilder('t')
            .where('t.user_id = :userId', { userId })
            .select([
                't.id as id',
                't.tareo_code as tareoCode',
                't.work_date as work_date',
                't.description as description',
                't.start_time as startTime',
                't.end_time as endTime',
                't.total_hours as totalHours',
                't.user_id as user_id',
                't.category_id as category',
                't.area_id as area',
                't.status_id as status',
            ])
            .getRawMany();

        return BaseResult.ok(result);
    }

    async findOneById(
        id: number, idUser: number
    ): Promise<BaseResult<GetListTareoResponse>> {
        const result =  await this.repository
            .createQueryBuilder('t')
            .where('t.user_id = :idUser', { idUser })
            .andWhere('t.id = :id', { id })
            .select([
                't.id as id',
                't.tareo_code as tareoCode',
                't.work_date as work_date',
                't.description as description',
                't.start_time as startTime',
                't.end_time as endTime',
                't.total_hours as totalHours',
                't.user_id as user_id',
                't.category_id as category',
                't.area_id as area',
                't.status_id as status',
            ])
            .getRawOne();

        return BaseResult.ok(result);
    }

    async getLastCodeByPrefix(prefix: string): Promise<string | null> {
        const result = await this.repository
            .createQueryBuilder("t")
            .where("t.tareo_code LIKE :prefix", { prefix: `${prefix}%` })
            .orderBy("t.tareo_code", "DESC")
            .getOne();

        return result?.tareo_code ?? null;
    }

    async getAllTareosOfDay(id: number, workDate: Date, excludeId?: number): Promise<Tareo[]> {
        const dateStr = new Date(workDate).toISOString().split("T")[0];

        const query = this.repository
            .createQueryBuilder("t")
            .where("t.user_id = :id", { id })
            .andWhere("DATE(t.work_date) = :workDate", { workDate: dateStr });

        if (excludeId) {
            query.andWhere("t.id != :excludeId", { excludeId });
        }

        return query.getMany();
    }


}