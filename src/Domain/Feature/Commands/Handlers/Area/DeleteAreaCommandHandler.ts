import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import type { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import { DeleteAreaCommand } from "../../Requests/Area/DeleteAreaCommand";

@CommandHandler(DeleteAreaCommand)
export class DeleteAreaCommandHandler
  implements ICommandHandler<DeleteAreaCommand>
{
  constructor(
    @Inject("IAreaRepository")
    private readonly categoryRepository: IAreaRepository
  ) {}

  async execute(command: DeleteAreaCommand): Promise<BaseResult<boolean>> {

    const category = await this.categoryRepository.findOneBy({ id: command.id });

    if (!category) {
      return BaseResult.fail(
        new AppError(ErrorCode.NotFound, "Area not found", "id")
      );
    }

    await this.categoryRepository.deleteAsync(category);

    return BaseResult.ok(true);
  }
}