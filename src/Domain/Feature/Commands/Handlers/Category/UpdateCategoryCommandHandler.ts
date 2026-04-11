import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import { UpdateCategoryCommand } from "../../Requests/Category/UpdateCategoryCommand";
import type { ICategoryRepository } from "src/Repository/Interface/ICategoryRepository";

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    @Inject("ICategoryRepository")
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<BaseResult<boolean>> {

    const category = await this.categoryRepository.findOneBy({ id: command.data.id });

    if (!category) {
      return BaseResult.fail(
        new AppError(ErrorCode.NotFound, "Category not found", "id")
      );
    }

    if (!command.data.key || command.data.key.trim().length === 0) {
      return BaseResult.fail(
        new AppError(ErrorCode.MandatoryField, "Key is required", "key")
      );
    }

    category.ca_key = command.data.key;
    category.description = (!command.data.description || command.data.description.trim().length === 0) ? category.description : command.data.description;

    await this.categoryRepository.updateAsync(category);

    return BaseResult.ok(true);
  }
}