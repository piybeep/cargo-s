import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Dubai Express',
    description: 'Наименование проекта',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id пользователя',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
