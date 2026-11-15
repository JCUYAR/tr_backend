import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import type { IStatusRepository } from "src/Repository/Interface/IStatusRepository";
import { DeleteStatusCommand } from "../../Requests/Status/DeleteStatusCommand";

@CommandHandler(DeleteStatusCommand)
export class DeleteStatusCommandHandler
  implements ICommandHandler<DeleteStatusCommand>
{
  constructor(
    @Inject("IStatusRepository")
    private readonly statusRepository: IStatusRepository
  ) {}

  async execute(command: DeleteStatusCommand): Promise<BaseResult<boolean>> {

    const status = await this.statusRepository.findOneBy({ id: command.id });

    if (!status) {
      return BaseResult.fail(
        new AppError(ErrorCode.NotFound, "Status not found", "id")
      );
    }

    await this.statusRepository.deleteAsync(status);

    return BaseResult.ok(true);
  }
}