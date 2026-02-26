import { ApiProperty } from "@nestjs/swagger";

export class AddStatusDto {
    @ApiProperty({
        example: 'Actividad bajo demanda',
        description: 'Category description',
    })
    description: string;
}