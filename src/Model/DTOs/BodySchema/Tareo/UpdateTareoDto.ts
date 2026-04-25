import { ApiProperty } from "@nestjs/swagger";

export class UpdateTareoDto {
    @ApiProperty({})
    id: number;

    @ApiProperty({})
    description: string;
    
    @ApiProperty({})
    category: number;
    
    @ApiProperty({})
    area: number;
    
    @ApiProperty({})
    status: number;  

    @ApiProperty({})
    user_id: number;

    @ApiProperty({})
    work_date: Date;

    @ApiProperty({})
    start_time: string;  

    @ApiProperty({})
    end_time: string;

}