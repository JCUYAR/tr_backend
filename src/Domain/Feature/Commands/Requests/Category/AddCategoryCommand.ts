import { AddCategoryDto } from "src/Model/DTOs/BodySchema/Category/AddCategoryDto";

export class AddCategoryCommand {
    constructor(
        public readonly data: AddCategoryDto
    ) {}
}