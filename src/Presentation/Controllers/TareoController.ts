import { Controller, Get, Param } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetListTareoByUserQuery } from "src/Domain/Feature/Queries/Requests/GetListTareoByUserQuery";
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

    @Get('ListTareoByUser/:id')
    async getByUser(@Param('id') id: number) {
        return await this.queryBus.execute(
            new GetListTareoByUserQuery(Number(id)));
    }
}