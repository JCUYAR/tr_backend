import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddTareoCommand } from "src/Domain/Feature/Commands/Requests/Tareo/AddTareoCommand";
import { UpdateTareoCommand } from "src/Domain/Feature/Commands/Requests/Tareo/UpdateTareoCommand";
import { GetListTareoByUserQuery } from "src/Domain/Feature/Queries/Requests/Tareo/GetListTareoByUserQuery";
import { GetListTareoQuery } from "src/Domain/Feature/Queries/Requests/Tareo/GetListTareoQuery";
import { AddTareoDto } from "src/Model/DTOs/BodySchema/Tareo/AddTareoDto";
import { UpdateTareoDto } from "src/Model/DTOs/BodySchema/Tareo/UpdateTareoDto";
import { JwtAuthGuard } from "../Guards/jwt-auth.guard";
import { GetOneTareoQuery } from "src/Domain/Feature/Queries/Requests/Tareo/GetOneTareoQuery";

@Controller('tareo')
export class TareoController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('ListTareo')
    async getAll() {
        return await this.queryBus.execute(new GetListTareoQuery());
    }

    @UseGuards(JwtAuthGuard)
    @Get('ListTareoByUser/:id')
    async getByUser(@Param('id') id: number) {
        return await this.queryBus.execute(
            new GetListTareoByUserQuery(Number(id)));
    }

    @UseGuards(JwtAuthGuard)
    @Get('ListOneById/:id&:idUser')
    async getOneById(
        @Param('id') id: number,
        @Param('idUser') idUser: number,
    ) {
        return await this.queryBus.execute(
            new GetOneTareoQuery(Number(id), Number(idUser)),
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post('AddTareo')
    @ApiOperation({ summary: 'AddTareo' })
    async addTareo(
        @Body() body: AddTareoDto

    ) {
        return this.commandBus.execute(
            new AddTareoCommand(body)
        )
    }

    @UseGuards(JwtAuthGuard)
    @Put('UpdateTareo')
    @ApiOperation({ summary: 'UpdateTareo' })
    async updateTareo(
        @Body() body: UpdateTareoDto
    ) {
        return this.commandBus.execute(
            new UpdateTareoCommand(body)
        )
    }

}