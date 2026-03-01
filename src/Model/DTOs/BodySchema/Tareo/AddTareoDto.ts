import { ApiProperty } from "@nestjs/swagger";

export class AddTareoDto {
    @ApiProperty({})
    description: string;
    
    @ApiProperty({})
    user_id: number;
    
    @ApiProperty({})
    category_id: number;
    
    @ApiProperty({})
    area_id: number;
    
    @ApiProperty({})
    status_id: number;  

    @ApiProperty({})
    work_date: Date;  

    @ApiProperty({})
    start_time: string;  

    @ApiProperty({})
    end_time: string;  

    @ApiProperty({})
    total_hours: number;

}