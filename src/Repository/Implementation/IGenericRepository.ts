export interface IGenericRepository<T> {
    getByIdAsync(id: number): Promise<T | null>;

    getAllAsync(): Promise<ReadonlyArray<T>>;

    addAsync(entity: T): Promise<T>;

    updateAsync(entity: T): Promise<T>;

    deleteAsync(entity: T): Promise<void>;

}