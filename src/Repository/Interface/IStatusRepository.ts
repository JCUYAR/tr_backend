import { IGenericRepository } from "./IGenericRepository";
import { Status } from "src/Model/Entities/status.entity";


export interface IStatusRepository extends IGenericRepository<Status> {
    existsByDescription(description: string): Promise<boolean>

}