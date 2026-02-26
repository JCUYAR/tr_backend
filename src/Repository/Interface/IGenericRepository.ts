import { FindOptionsWhere } from "typeorm";

export interface IGenericRepository<T> {
    findOneBy(condition: FindOptionsWhere<T>): Promise<T | null>;

    addAsync(entity: T): Promise<boolean>;

    updateAsync(entity: T): Promise<T>;

    deleteAsync(entity: T): Promise<void>;

}