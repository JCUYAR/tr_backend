import { Category } from "src/Model/Entities/category.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICategoryRepository } from "../Interface/ICategoryRepository";
import { GenericRepository } from "./GenericRepository";

@Injectable()
export class CategoryRepository extends GenericRepository<Category> implements ICategoryRepository{
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
        super(categoryRepository)
    }
    async existsByDescription(description: string): Promise<boolean> {
        const category = await this.findOneBy({ description });
        return !!category;
    }
}