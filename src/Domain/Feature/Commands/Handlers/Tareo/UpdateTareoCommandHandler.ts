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
    implements ICommandHandler<UpdateTareoCommand>
{
    constructor(
        @Inject("ITareoRepository")
        private readonly tareoRepository: ITareoRepository,

        @Inject('IStatusRepository')
        private readonly statusRepository: IStatusRepository,

        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,

        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
        
    ) {}

    async execute(command: UpdateTareoCommand): Promise<BaseResult<boolean>> {
        const tareo = await this.tareoRepository.findOneBy({ id: command.id });

        if (!tareo) {
            return BaseResult.fail(
            new AppError(ErrorCode.NotFound, "Tareo not found", "id")
            );
        }

        const isStatus = await this.statusRepository.findById(command.status_id);

        if (!isStatus) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "Status doesn't exists", "status"))
        }

        const isArea = await this.areaRepository.findById(command.area_id);

        if (!isArea) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "Area doesn't exists", "area"))
        }

        const isCategory = await this.categoryRepository.findById(command.category_id);

        if (!isCategory) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "Category doesn't exists", "category"))
        }


        tareo.description = (!command.description || command.description.trim().length === 0) ? tareo.description : command.description;
        tareo.area = { id: command.area_id } as Area;
        tareo.category = { id: command.category_id } as unknown as Category;
        tareo.status = { id: command.status_id } as Status;
        tareo.start_time = command.start_time;
        tareo.end_time = command.end_time;
        tareo.total_hours = calculateHours(command.start_time, command.end_time);

        await this.tareoRepository.updateAsync(tareo);

        return BaseResult.ok();

    }
}