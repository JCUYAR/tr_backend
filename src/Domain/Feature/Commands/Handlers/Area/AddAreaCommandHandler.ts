import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import { Inject } from "@nestjs/common";
import type { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import { Area } from "src/Model/Entities/area.entity";
import { AddAreaCommand } from "../../Requests/Area/AddAreaCommand";

@CommandHandler(AddAreaCommand)
export class AddAreaCommandHandler implements ICommandHandler<AddAreaCommand> {
    constructor(
        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,
    ) {}

    async execute(
        command: AddAreaCommand,
    ): Promise<BaseResult<boolean>> {

        if (!command || command.description.trim().length === 0) {
            return BaseResult.fail(new AppError(ErrorCode.MandatoryField, "The description is required", "description"));
        }

        const exists = await this.areaRepository.existsByDescription(command.description);

        if (exists) {
            return BaseResult.fail(new AppError(ErrorCode.DuplicateData, "The area is already exists", "description"));
        }

        const area = new Area();
        area.description = command.description;

        const result = await this.areaRepository.addAsync(area);

        if (!result) {
            return BaseResult.fail(new AppError(ErrorCode.DatabaseCommitNotAffected, "Area not created", "description"));
        }

        return BaseResult.ok(true);
    }
}