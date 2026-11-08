import { ApiProperty } from "@nestjs/swagger";

export class DeleteAreaDto {
    @ApiProperty({
        example: '1',
        description: 'Area id',
    })
    id: number;
}