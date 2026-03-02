import { ApiProperty } from "@nestjs/swagger";

export class UpdateTareoDto {
    @ApiProperty({})
    id: number;

    @ApiProperty({})
    description: string;
    
    @ApiProperty({})
    category_id: number;
    
    @ApiProperty({})
    area_id: number;
    
    @ApiProperty({})
    status_id: number;  

    @ApiProperty({})
    start_time: string;  

    @ApiProperty({})
    end_time: string;

}