import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import { Inject } from "@nestjs/common";
import type { IStatusRepository } from "src/Repository/Interface/IStatusRepository";
import { Status } from "src/Model/Entities/status.entity";
import { AddStatusCommand } from "../../Requests/Status/AddStatusCommand";

@CommandHandler(AddStatusCommand)
export class AddStatusCommandHandler implements ICommandHandler<AddStatusCommand> {
    constructor(
        @Inject('IStatusRepository')
        private readonly statusRepository: IStatusRepository,
    ) {}

    async execute(
        command: AddStatusCommand,
    ): Promise<BaseResult<boolean>> {

        if (!command || command.description.trim().length === 0) {
            return BaseResult.fail(new AppError(ErrorCode.MandatoryField, "The description is required", "description"));
        }

        const exists = await this.statusRepository.existsByDescription(command.description);

        if (exists) {
            return BaseResult.fail(new AppError(ErrorCode.DuplicateData, "The status is already exists", "description"));
        }

        const status = new Status();
        status.description = command.description;

        const result = await this.statusRepository.addAsync(status);

        if (!result) {
            return BaseResult.fail(new AppError(ErrorCode.DatabaseCommitNotAffected, "Status not created", "description"));
        }

        return BaseResult.ok(true);
    }
}