import { IGenericRepository } from "./IGenericRepository";
import { Status } from "src/Model/Entities/status.entity";


export interface IUserRepository extends IGenericRepository<Status> {
    findById(id: number): Promise<boolean>;

}