import { ApiProperty } from "@nestjs/swagger";

export class AddCategoryDto {
    @ApiProperty({
        example: 'RG',
        description: 'Category code',
    })
    key: string;
    
    @ApiProperty({
        example: 'Actividad bajo demanda',
        description: 'Category description',
    })
    description: string;
}