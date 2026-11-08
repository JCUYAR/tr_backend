import { ApiProperty } from "@nestjs/swagger";

export class DeleteStatusDto {
    @ApiProperty({
        example: '1',
        description: 'Status id',
    })
    id: number;
}