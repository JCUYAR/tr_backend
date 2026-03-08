import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddUserCommand } from "src/Domain/Feature/Commands/Requests/Users/AddUserCommand";
import { AddUserDto } from "src/Model/DTOs/BodySchema/Users/AddUserDto";

@Controller('user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}
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
}