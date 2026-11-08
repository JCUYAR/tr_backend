
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import type { IStatusRepository } from "src/Repository/Interface/IStatusRepository";
import { UpdateStatusCommand } from "../../Requests/Status/UpdateStatusCommand";

@CommandHandler(UpdateStatusCommand)
export class UpdateStatusCommandHandler
  implements ICommandHandler<UpdateStatusCommand>
{
  constructor(
    @Inject("IStatusRepository")
    private readonly statusRepository: IStatusRepository
  ) {}

  async execute(command: UpdateStatusCommand): Promise<BaseResult<boolean>> {

    const status = await this.statusRepository.findOneBy({ id: command.id });

    if (!status) {
      return BaseResult.fail(
        new AppError(ErrorCode.NotFound, "Status not found", "id")
      );
    }

    // if (!command.data.key || command.data.key.trim().length === 0) {
    //   return BaseResult.fail(
    //     new AppError(ErrorCode.MandatoryField, "Key is required", "key")
    //   );
    // }

    // status.id = command.id;
    status.description = (!command.description || command.description.trim().length === 0) ? status.description : command.description;

    await this.statusRepository.updateAsync(status);

    return BaseResult.ok(true);
  }
}