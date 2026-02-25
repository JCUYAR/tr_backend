import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddCategoryCommand } from "src/Domain/Feature/Commands/Requests/AddCategoryCommand";
import { AddCategoryDto } from "src/Model/DTOs/BodySchema/Catalog/Category/AddCategoryDto";

@Controller('catalog')
export class CatalogController {
    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    @Post('AddCategory')
    @ApiOperation({ summary: 'AddCategory' })
    async addCategory(
        @Body() body: AddCategoryDto
    ){
        return this.commandBus.execute(
      new AddCategoryCommand(body.description)
    );
    }
}