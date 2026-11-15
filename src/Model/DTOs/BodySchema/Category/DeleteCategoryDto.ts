import { ApiProperty } from "@nestjs/swagger";

export class DeleteCategoryDto {
    @ApiProperty({
        example: 'G-00001',
        description: 'Category ca_key',
    })
    ca_key: string;
}