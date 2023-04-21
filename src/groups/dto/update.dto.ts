import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({
    example: 'Food',
    description: 'Название группы',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'скрыть группу',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  hide: boolean;

  @ApiProperty({
    example: 3,
    description: 'порядковый номер в списке',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  position: number;
}
