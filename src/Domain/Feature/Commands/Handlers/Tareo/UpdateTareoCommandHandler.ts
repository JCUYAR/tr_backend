import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTareoCommand } from "../../Requests/Tareo/UpdateTareoCommand";
import { Inject } from "@nestjs/common";
import type { ITareoRepository } from "src/Repository/Interface/ITareoRepository";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import type { IStatusRepository } from "src/Repository/Interface/IStatusRepository";
import type { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import type { ICategoryRepository } from "src/Repository/Interface/ICategoryRepository";
import { Area } from "src/Model/Entities/area.entity";
import { Category } from "src/Model/Entities/category.entity";
import { Status } from "src/Model/Entities/status.entity";
import { calculateHours } from "src/Domain/Helpers/CalculateWorkedHours";

@CommandHandler(UpdateTareoCommand)
export class UpdateTareoCommandHandler
    implements ICommandHandler<UpdateTareoCommand> {
    constructor(
        @Inject("ITareoRepository")
        private readonly tareoRepository: ITareoRepository,

        @Inject('IStatusRepository')
        private readonly statusRepository: IStatusRepository,

        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,

        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,

    ) { }

    async execute(command: UpdateTareoCommand): Promise<BaseResult<boolean>> {
        const tareo = await this.tareoRepository.findOneBy({ id: command.data.id });

        if (!tareo) {
            return BaseResult.fail(
                new AppError(ErrorCode.NotFound, "Tareo not found", "id")
            );
        }

        const isStatus = await this.statusRepository.findById(command.data.status);

        if (!isStatus) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "Status doesn't exists", "status"))
        }

        const isArea = await this.areaRepository.findById(command.data.area);

        if (!isArea) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "Area doesn't exists", "area"))
        }

        const isCategory = await this.categoryRepository.findById(command.data.category);

        if (!isCategory) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "Category doesn't exists", "category"))
        }

        const listTareos = await this.tareoRepository.getAllTareosOfDay(
            command.data.user_id,
            tareo.work_date,
            command.data.id
        );

        const timeToMinutes = (time: string): number => {
            const [h, m] = time.split(":").map(Number);
            return h * 60 + m;
        };

        const newStart = timeToMinutes(command.data.start_time);
        const newEnd = timeToMinutes(command.data.end_time);

        const conflicting = listTareos.find(t => {
            const tStart = timeToMinutes(t.start_time);
            const tEnd = timeToMinutes(t.end_time);
            return newStart < tEnd && newEnd > tStart;
        });

        if (conflicting) {
            return BaseResult.fail(
                new AppError(
                    ErrorCode.Conflict,
                    `El horario se cruza con el tareo ${conflicting.tareo_code} (${conflicting.start_time} - ${conflicting.end_time})`,
                    "time_conflict"
                )
            );
        }


        tareo.description = (!command.data.description || command.data.description.trim().length === 0) ? tareo.description : command.data.description;
        tareo.area = { id: command.data.area } as Area;
        tareo.category = { id: command.data.category } as unknown as Category;
        tareo.status = { id: command.data.status } as Status;
        tareo.start_time = command.data.start_time;
        tareo.end_time = command.data.end_time;
        tareo.total_hours = calculateHours(command.data.start_time, command.data.end_time);

        await this.tareoRepository.updateAsync(tareo);

        return BaseResult.ok(true);

    }
}