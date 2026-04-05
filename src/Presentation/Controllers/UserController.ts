import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddUserCommand } from "src/Domain/Feature/Commands/Requests/Users/AddUserCommand";
import { AddUserDto } from "src/Model/DTOs/BodySchema/Users/AddUserDto";
import { JwtAuthGuard } from "../Guards/jwt-auth.guard";
import { GetUserDataQuery } from "src/Domain/Feature/Queries/Requests/Users/GetUserDataQuery";
import { ListAllUsersQuery } from "src/Domain/Feature/Queries/Requests/Users/ListAllUsersQuery";

@Controller('user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post('AddUser')
    @ApiOperation({ summary: 'AddUser' })
    async addUser(
        @Body() body: AddUserDto

    ) {
        return this.commandBus.execute(
            new AddUserCommand(
                body.first_name,
                body.last_name,
                body.document_number
            )
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('GetUserById/:id')
    async getUserById(@Param('id') id: number) {
        return await this.queryBus.execute(
            new GetUserDataQuery(Number(id)));
    }

    @UseGuards(JwtAuthGuard)
    @Get('ListAllUser')
    async listAllUser() {
        return await this.queryBus.execute(new ListAllUsersQuery());
    }
}