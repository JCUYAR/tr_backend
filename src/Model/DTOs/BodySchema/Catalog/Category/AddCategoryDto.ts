import { ApiProperty } from "@nestjs/swagger";

export class AddCategoryDto {
    @ApiProperty({
        example: 'Actividad bajo demanda',
        description: 'Category description',
    })
    description: string;
}