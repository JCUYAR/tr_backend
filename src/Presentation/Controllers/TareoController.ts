import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddTareoCommand } from "src/Domain/Feature/Commands/Requests/Tareo/AddTareoCommand";
import { GetListTareoByUserQuery } from "src/Domain/Feature/Queries/Requests/Tareo/GetListTareoByUserQuery";
import { GetListTareoQuery } from "src/Domain/Feature/Queries/Requests/Tareo/GetListTareoQuery";
import { AddTareoDto } from "src/Model/DTOs/BodySchema/Tareo/AddTareoDto";

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

    @Post('AddTareo')
    @ApiOperation({ summary: 'AddTareo' })
    async addTareo(
        @Body() body: AddTareoDto

    ) {
        return this.commandBus.execute(
            new AddTareoCommand(
                body.description,
                body.user_id,
                body.category_id,  // ✔ correcto
                body.area_id,
                body.status_id,
                body.work_date,
                body.start_time,
                body.end_time,
                body.total_hours
            )
        )
    }
    
}