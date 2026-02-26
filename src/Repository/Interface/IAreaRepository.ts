import { Area } from "src/Model/Entities/area.entity";
import { IGenericRepository } from "./IGenericRepository";


export interface IAreaRepository extends IGenericRepository<Area> {
    existsByDescription(description: string): Promise<boolean>

}