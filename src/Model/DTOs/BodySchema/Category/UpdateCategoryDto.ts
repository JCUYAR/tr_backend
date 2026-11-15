import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {

  @ApiProperty()
  ca_key: string;

  @ApiProperty()
  description: string;
}