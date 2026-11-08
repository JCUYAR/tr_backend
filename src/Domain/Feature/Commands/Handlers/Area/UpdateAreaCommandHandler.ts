import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import { UpdateAreaCommand } from "../../Requests/Area/UpdateAreaCommand";
import type { IAreaRepository } from "src/Repository/Interface/IAreaRepository";

@CommandHandler(UpdateAreaCommand)
export class UpdateAreaCommandHandler
  implements ICommandHandler<UpdateAreaCommand>
{
  constructor(
    @Inject("IAreaRepository")
    private readonly areaRepository: IAreaRepository
  ) {}

  async execute(command: UpdateAreaCommand): Promise<BaseResult<boolean>> {

    const area = await this.areaRepository.findOneBy({ id: command.id });

    if (!area) {
      return BaseResult.fail(
        new AppError(ErrorCode.NotFound, "Area not found", "id")
      );
    }

    // if (!command.data.key || command.data.key.trim().length === 0) {
    //   return BaseResult.fail(
    //     new AppError(ErrorCode.MandatoryField, "Key is required", "key")
    //   );
    // }

    // area.id = command.id;
    area.description = (!command.description || command.description.trim().length === 0) ? area.description : command.description;

    await this.areaRepository.updateAsync(area);

    return BaseResult.ok(true);
  }
}