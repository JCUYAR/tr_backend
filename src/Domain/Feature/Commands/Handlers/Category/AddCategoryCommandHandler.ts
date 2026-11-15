import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { Category } from "src/Model/Entities/category.entity";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import { Inject } from "@nestjs/common";
import type { ICategoryRepository } from "src/Repository/Interface/ICategoryRepository";
import { AddCategoryCommand } from "../../Requests/Category/AddCategoryCommand";
import { Area } from "src/Model/Entities/area.entity";
import type { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import { generateNextCode } from "src/Domain/Helpers/GenerateCode";

@CommandHandler(AddCategoryCommand)
export class AddCategoryCommandHandler implements ICommandHandler<AddCategoryCommand> {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,

        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,
    ) {}

    async execute(
        command: AddCategoryCommand,
    ): Promise<BaseResult<boolean>> {

        if (!command || command.data.description.trim().length === 0) {
            return BaseResult.fail(new AppError(ErrorCode.MandatoryField, "The description is required", "description"));
        }

        const exists = await this.categoryRepository.existsByDescription(command.data.description);

        if (exists) {
            return BaseResult.fail(new AppError(ErrorCode.DuplicateData, "The category is already exists", "description"));
        }

        const isArea = await this.areaRepository.findById(
            command.data.area_id
        );

        if (!isArea) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "Area doesn't exists", "area"))
        }

        const initials = isArea.description?.substring(0, 1).toUpperCase();
        const prefix = `${initials}`
        const lastCode = await this.categoryRepository.getLastCodeByPrefix(prefix);
        const categoryCode = await generateNextCode(prefix, lastCode);

        const category = new Category();
        category.ca_key = categoryCode;
        category.description = command.data.description;
        category.area = { id: command.data.area_id } as Area;

        const result = await this.categoryRepository.addAsync(category);

        if (!result) {
            return BaseResult.fail(new AppError(ErrorCode.DatabaseCommitNotAffected, "Category not created", "description"));
        }

        return BaseResult.ok(result);
    }
}