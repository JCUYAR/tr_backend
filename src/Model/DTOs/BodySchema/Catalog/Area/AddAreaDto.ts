import { ApiProperty } from "@nestjs/swagger";

export class AddAreaDto {
    @ApiProperty({
        example: 'Sistemas',
        description: 'Area description',
    })
    description: string;
}