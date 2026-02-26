import { Controller, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetListTareoQuery } from "src/Domain/Feature/Queries/Requests/GetListTareoQuery";

@Controller('tareo')
export class TareoController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get('ListTareo')
    async getAll() {
        return await this.queryBus.execute(new GetListTareoQuery());
    }
}