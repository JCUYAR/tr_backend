import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddTareoCommand } from "../../Requests/Tareo/AddTareoCommand";
import type { ITareoRepository } from "src/Repository/Interface/ITareoRepository";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { Tareo } from "src/Model/Entities/tareo.entity";
import { User } from "src/Model/Entities/user.entity";
import { Area } from "src/Model/Entities/area.entity";
import { Status } from "src/Model/Entities/status.entity";

@CommandHandler(AddTareoCommand)
export class AddTareoCommandHandler implements ICommandHandler<AddTareoCommand> {
    constructor(
        @Inject('ITareoRepository')
        private readonly tareoRepository: ITareoRepository,

    ) {}

    async execute(
        command: AddTareoCommand,
    ): Promise<BaseResult<boolean>> {

        const tareo = new Tareo();
        tareo.description = command.description;
        tareo.user = { id: command.user_id } as User;
        tareo.area = { id: command.area_id } as Area;
        tareo.status = { id: command.status_id } as Status;
        tareo.work_date = command.work_date;
        tareo.start_time = command.start_time;
        tareo.end_time = command.end_time;
        tareo.total_hours = command.total_hours;

        const result = await this.tareoRepository.addAsync(tareo);

        return BaseResult.ok(true);

    }

}