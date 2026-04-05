import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation } from "@nestjs/swagger";
import { AddCategoryCommand } from "src/Domain/Feature/Commands/Requests/Category/AddCategoryCommand";
import { UpdateCategoryCommand } from "src/Domain/Feature/Commands/Requests/Category/UpdateCategoryCommand";
import { AddStatusDto } from "src/Model/DTOs/BodySchema/Catalog/Status/AddStatusDto";
import { AddCategoryDto } from "src/Model/DTOs/BodySchema/Category/AddCategoryDto";
import { UpdateCategoryDto } from "src/Model/DTOs/BodySchema/Category/UpdateCategoryDto";
import { JwtAuthGuard } from "../Guards/jwt-auth.guard";
import { ListAllCateQuery } from "src/Domain/Feature/Queries/Requests/Category/ListAllCateQuery";

@Controller('category')
export class CategoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('AddCategory')
    @ApiOperation({ summary: 'AddCategory' })
    async addCategory(
        @Body() body: AddCategoryDto
    ){
        return this.commandBus.execute(
      new AddCategoryCommand(body.key, body.description)
    );
    }

    @UseGuards(JwtAuthGuard)
    @Put('UpdateCategory')
    @ApiOperation({ summary: 'UpdateCategory' })
    async updateCategory(
        @Body() body: UpdateCategoryDto
    ) {
        return this.commandBus.execute(
            new UpdateCategoryCommand(body)
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('ListAllCategory')
    async ListAllCategory() {
        return await this.queryBus.execute(new ListAllCateQuery());
    }
}