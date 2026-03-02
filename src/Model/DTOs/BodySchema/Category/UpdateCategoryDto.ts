import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {

  @ApiProperty()
  id: number;

  @ApiProperty()
  key: string;

  @ApiProperty()
  description: string;
}