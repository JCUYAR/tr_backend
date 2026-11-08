import { ApiProperty } from "@nestjs/swagger";

export class UpdateStatusDto {
    @ApiProperty({
        example: '1',
        description: 'Estado description',
    })
    id: number;
    @ApiProperty({
        example: 'ActivoW',
        description: 'Estado description',
    })
    description: string;
}