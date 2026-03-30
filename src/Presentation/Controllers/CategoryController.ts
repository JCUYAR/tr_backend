import { Body, Controller, Post, Put } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddCategoryCommand } from "src/Domain/Feature/Commands/Requests/Category/AddCategoryCommand";
import { UpdateCategoryCommand } from "src/Domain/Feature/Commands/Requests/Category/UpdateCategoryCommand";
import { AddStatusDto } from "src/Model/DTOs/BodySchema/Catalog/Status/AddStatusDto";
import { AddCategoryDto } from "src/Model/DTOs/BodySchema/Category/AddCategoryDto";
import { UpdateCategoryDto } from "src/Model/DTOs/BodySchema/Category/UpdateCategoryDto";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    @Post('AddCategory')
    @ApiOperation({ summary: 'AddCategory' })
    async addCategory(
        @Body() body: AddCategoryDto
    ){
        return this.commandBus.execute(
      new AddCategoryCommand(body.key, body.description)
    );
    }

    @Put('UpdateCategory')
    @ApiOperation({ summary: 'UpdateCategory' })
    async updateCategory(
        @Body() body: UpdateCategoryDto
    ) {
        return this.commandBus.execute(
            new UpdateCategoryCommand(body)
        )
    }
}