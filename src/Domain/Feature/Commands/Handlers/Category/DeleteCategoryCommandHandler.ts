import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import type { ICategoryRepository } from "src/Repository/Interface/ICategoryRepository";
import { DeleteCategoryCommand } from "../../Requests/Category/DeleteCategoryCommand";
import { Category } from "src/Model/Entities/category.entity";


@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    @Inject("ICategoryRepository")
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(command: DeleteCategoryCommand): Promise<BaseResult<boolean>> {

    const countCate = await this.categoryRepository.countCategoryInTareo(command.caKey);

    if (countCate > 0)
      return BaseResult.fail(
        new AppError(ErrorCode.DataUsed, `La categoría ${command.caKey}, está siendo usada en registros de tareo.`, "ca_key")
      );
    
    const category = await this.categoryRepository.oneByCaKey(command.caKey);

    if (!category)
      return BaseResult.fail(
        new AppError(ErrorCode.NotFound, "Category not found", "caKey")
      );
    
    await this.categoryRepository.deleteAsync(category);

    return BaseResult.ok(true);
  }
}