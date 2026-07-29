import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiQuery } from "@nestjs/swagger";
import { AddAreaCommand } from "src/Domain/Feature/Commands/Requests/Area/AddAreaCommand";
import { AddStatusCommand } from "src/Domain/Feature/Commands/Requests/Status/AddStatusCommand";
import { AddAreaDto } from "src/Model/DTOs/BodySchema/Catalog/Area/AddAreaDto";
import { AddStatusDto } from "src/Model/DTOs/BodySchema/Catalog/Status/AddStatusDto";
import { JwtAuthGuard } from "../Guards/jwt-auth.guard";
import { ListAllAreaQuery } from "src/Domain/Feature/Queries/Requests/Area/ListAllAreaQuery";
import { ListAllStatusQuery } from "src/Domain/Feature/Queries/Requests/Status/ListAllStatusQuery";
import { GetPagedListCatalogQuery } from "src/Domain/Feature/Queries/Requests/Catalog/GetPagedListCatalogQuery";
import { PagedResponse } from "src/Model/Wrappers/PagedResponseDto";
import { ListCatalogResponse } from "src/Model/DTOs/Responses/Catalog/ListCatalogResponse";

@Controller('catalog')
export class CatalogController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    // Category
    @UseGuards(JwtAuthGuard)
    @Post('AddStatus')
    @ApiOperation({ summary: 'AddStatus' })
    async addStatus(
        @Body() body: AddStatusDto
    ) {
        return this.commandBus.execute(
            new AddStatusCommand(body.description)
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('ListAllStatus')
    async ListAllStatus() {
        return await this.queryBus.execute(new ListAllStatusQuery());
    }


    // Area
    @UseGuards(JwtAuthGuard)
    @Post('AddArea')
    @ApiOperation({ summary: 'AddArea' })
    async addArea(
        @Body() body: AddAreaDto
    ) {
        return this.commandBus.execute(
            new AddAreaCommand(body.description)
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('ListAllArea')
    async ListAllArea() {
        return await this.queryBus.execute(new ListAllAreaQuery());
    }

    @ApiQuery({ name: 'pageNumber', required: true, type: Number })
    @ApiQuery({ name: 'pageSize', required: true, type: Number })
    @ApiQuery({ name: 'type', required: false, type: String })
    @ApiQuery({ name: 'description', required: false, type: String })
    @UseGuards(JwtAuthGuard)
    @Get('GetPagedList')
    async GetPagedList(
        @Query() query: any,
    ): Promise<PagedResponse<ListCatalogResponse>> {
        const pagedQuery = new GetPagedListCatalogQuery(
            Number(query.pageNumber),
            Number(query.pageSize),
            query.type,
            query.description,
        );

        return this.queryBus.execute(pagedQuery);
    }
}