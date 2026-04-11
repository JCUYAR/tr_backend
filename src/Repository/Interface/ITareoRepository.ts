import { Tareo } from "src/Model/Entities/tareo.entity";
import { IGenericRepository } from "./IGenericRepository";
import { Status } from "src/Model/Entities/status.entity";
import { GetListTareoResponse } from "src/Model/DTOs/Responses/Tareo/GetListTareoResponse";
import { BaseResult } from "src/Model/Wrappers/BaseResult";


export interface ITareoRepository extends IGenericRepository<Tareo>{
    findAllWithRelations(): Promise<BaseResult<GetListTareoResponse[]>>;

    findByUser(userId: number): Promise<BaseResult<GetListTareoResponse[]>>;

    findOneById(id: number, idUser: number): Promise<BaseResult<GetListTareoResponse>>;

    getLastCodeByPrefix(prefix: string): Promise<string | null>;
    //findByDateRange(start: Date, end: Date): Promise<GetListTareoResponse[]>;

    //createTareo(tareo: Tareo): Promise<Boolean>

}