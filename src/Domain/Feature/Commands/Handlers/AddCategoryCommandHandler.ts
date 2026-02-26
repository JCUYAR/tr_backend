import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddCategoryCommand } from "../Requests/AddCategoryCommand";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { Category } from "src/Model/Entities/category.entity";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import { Inject } from "@nestjs/common";
import type { ICategoryRepository } from "src/Repository/Interface/ICategoryRepository";

@CommandHandler(AddCategoryCommand)
export class AddCategoryCommandHandler implements ICommandHandler<AddCategoryCommand> {
    constructor(
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
    ) {}

    async execute(
        command: AddCategoryCommand,
    ): Promise<BaseResult<boolean>> {

        if (!command || command.description.trim().length === 0) {
            return BaseResult.fail(new AppError(ErrorCode.MandatoryField, "The description is required", "description"));
        }

        const exists = await this.categoryRepository.existsByDescription(command.description);

        if (exists) {
            return BaseResult.fail(new AppError(ErrorCode.DuplicateData, "The category is already exists", "description"));
        }

        const category = new Category();
        category.ca_key = command.key;
        category.description = command.description;

        const result = await this.categoryRepository.addAsync(category);

        if (!result) {
            return BaseResult.fail(new AppError(ErrorCode.DatabaseCommitNotAffected, "Category not created", "description"));
        }

        return BaseResult.ok(true);
    }
}