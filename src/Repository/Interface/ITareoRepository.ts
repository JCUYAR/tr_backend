import { Tareo } from "src/Model/Entities/tareo.entity";
import { IGenericRepository } from "./IGenericRepository";
import { Status } from "src/Model/Entities/status.entity";
import { GetListTareoResponse } from "src/Model/DTOs/Responses/Tareo/GetListTareoResponse";


export interface ITareoRepository extends IGenericRepository<Tareo>{
    findAllWithRelations(): Promise<GetListTareoResponse[]>;

    findByUser(userId: number): Promise<GetListTareoResponse[]>;

    findById(id: number): Promise<boolean>;

    getLastCodeByPrefix(prefix: string): Promise<string | null>;

    //findByDateRange(start: Date, end: Date): Promise<GetListTareoResponse[]>;

    //createTareo(tareo: Tareo): Promise<Boolean>

}