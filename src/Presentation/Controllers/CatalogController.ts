import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddAreaCommand } from "src/Domain/Feature/Commands/Requests/Area/AddAreaCommand";
import { AddStatusCommand } from "src/Domain/Feature/Commands/Requests/Status/AddStatusCommand";
import { AddAreaDto } from "src/Model/DTOs/BodySchema/Catalog/Area/AddAreaDto";
import { AddStatusDto } from "src/Model/DTOs/BodySchema/Catalog/Status/AddStatusDto";

@Controller('catalog')
export class CatalogController {
    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    @Post('AddStatus')
    @ApiOperation({ summary: 'AddStatus' })
    async addStatus(
        @Body() body: AddStatusDto
    ){
        return this.commandBus.execute(
      new AddStatusCommand(body.description)
    );
    }
    
    @Post('AddArea')
    @ApiOperation({ summary: 'AddArea' })
    async addArea(
        @Body() body: AddAreaDto
    ){
        return this.commandBus.execute(
      new AddAreaCommand(body.description)
    );
    }
}