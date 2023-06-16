import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Dubai Express',
    description: 'Наименование проекта',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
