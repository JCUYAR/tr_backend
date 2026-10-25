import { ApiProperty } from "@nestjs/swagger";

export class UpdateAreaDto {
    @ApiProperty({
        example: '1',
        description: 'Area description',
    })
    id: number;
    @ApiProperty({
        example: 'Sistemas',
        description: 'Area description',
    })
    description: string;
}