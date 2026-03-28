import { UpdateCategoryDto } from "src/Model/DTOs/BodySchema/Category/UpdateCategoryDto";

export class UpdateCategoryCommand {
  constructor(
    public readonly data: UpdateCategoryDto
  ) {}
}