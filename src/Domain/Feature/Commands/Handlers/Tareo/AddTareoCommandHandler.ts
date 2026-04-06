import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddTareoCommand } from "../../Requests/Tareo/AddTareoCommand";
import type { ITareoRepository } from "src/Repository/Interface/ITareoRepository";
import { Inject } from "@nestjs/common";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { Tareo } from "src/Model/Entities/tareo.entity";
import { User } from "src/Model/Entities/user.entity";
import { Area } from "src/Model/Entities/area.entity";
import { Status } from "src/Model/Entities/status.entity";
import { Category } from "src/Model/Entities/category.entity";
import type { IUserRepository } from "src/Repository/Interface/IUserRepository";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import { AppError } from "src/Model/Wrappers/Error";
import type { IStatusRepository } from "src/Repository/Interface/IStatusRepository";
import type { IAreaRepository } from "src/Repository/Interface/IAreaRepository";
import type { ICategoryRepository } from "src/Repository/Interface/ICategoryRepository";
import { calculateHours } from "src/Domain/Helpers/CalculateWorkedHours";
import { generateNextCode } from "src/Domain/Helpers/GenerateCode";

@CommandHandler(AddTareoCommand)
export class AddTareoCommandHandler implements ICommandHandler<AddTareoCommand> {
    constructor(
        @Inject('ITareoRepository')
        private readonly tareoRepository: ITareoRepository,

        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,

        @Inject('IStatusRepository')
        private readonly statusRepository: IStatusRepository,

        @Inject('IAreaRepository')
        private readonly areaRepository: IAreaRepository,

        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,

    ) {}

    async execute(command: AddTareoCommand) {
        const isUser = await this.userRepository.findById(command.data.user_id);

        if (!isUser) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "User doesn't exists", "user"))
        }

        const initials = isUser.username?.substring(0,2).toUpperCase();
        const prefix = `${initials}1`;
        const lastCode = await this.tareoRepository.getLastCodeByPrefix(prefix);
        const tareoCode = await generateNextCode(prefix, lastCode);
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



        const tareo = new Tareo();
        tareo.tareo_code = tareoCode;
        tareo.description = command.data.description;
        tareo.user = { id: command.data.user_id } as User;
        tareo.area = { id: command.data.area } as Area;
        tareo.category = { id: command.data.category } as unknown as Category;
        tareo.status = { id: command.data.status } as Status;
        tareo.work_date = command.data.work_date;
        tareo.start_time = command.data.start_time;
        tareo.end_time = command.data.end_time;
        tareo.total_hours = await calculateHours(command.data.start_time, command.data.end_time);

        await this.tareoRepository.addAsync(tareo);

        return BaseResult.ok();

    }

}