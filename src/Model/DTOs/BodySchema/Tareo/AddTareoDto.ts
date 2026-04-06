import { ApiProperty } from "@nestjs/swagger";

export class AddTareoDto {
    @ApiProperty({})
    description: string;
    
    @ApiProperty({})
    user_id: number;
    
    @ApiProperty({})
    category: number;
    
    @ApiProperty({})
    area: number;
    
    @ApiProperty({})
    status: number;  

    @ApiProperty({})
    work_date: Date;  

    @ApiProperty({})
    start_time: string;  

    @ApiProperty({})
    end_time: string;

}