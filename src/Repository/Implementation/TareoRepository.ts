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
            .leftJoin('t.user', 'u')
            .leftJoin('t.category', 'c')
            .leftJoin('t.area', 'a')
            .leftJoin('t.status', 's')
            .select([
                't.id as id',
                't.tareo_code as tareoCode',
                't.work_date as workDate',
                't.description as description',
                't.start_time as startTime',
                't.end_time as endTime',
                't.total_hours as totalHours',
                'u.username as username',
                'c.description as category',
                'a.description as area',
                's.description as status',
            ])
            .getRawMany();

        return BaseResult.ok(result);
    }

    async findByUser(userId: number): Promise<GetListTareoResponse[]> {

        return await this.repository
            .createQueryBuilder('t')
            .leftJoin('t.user', 'u')
            .leftJoin('t.category', 'c')
            .leftJoin('t.area', 'a')
            .leftJoin('t.status', 's')
            .where('t.user_id = :userId', { userId })
            .select([
                't.id as id',
                't.tareo_code as tareoCode',
                't.work_date as workDate',
                't.description as description',
                't.total_hours as totalHours',
                'u.username as username',
                'c.description as category',
                'a.description as area',
                's.description as status',
            ])
            .getRawMany();
    }

    async findById(id: number): Promise<boolean> {
        const category = await this.findOneBy({ id });
        return !!category;
    }

    async getLastCodeByPrefix(prefix: string): Promise<string | null> {
        const result = await this.repository
            .createQueryBuilder("t")
            .where("t.tareo_code LIKE :prefix", { prefix: `${prefix}%` })
            .orderBy("t.tareo_code", "DESC")
            .getOne();

        return result?.tareo_code ?? null;
    }


}