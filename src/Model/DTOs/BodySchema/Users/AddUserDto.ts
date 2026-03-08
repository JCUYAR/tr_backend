import { ApiProperty } from "@nestjs/swagger";

export class AddUserDto {
    @ApiProperty({})
    first_name: string;
    
    @ApiProperty({})
    last_name: string;
    
    @ApiProperty({})
    document_number: string;
}