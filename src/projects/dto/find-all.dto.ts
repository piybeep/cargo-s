import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { SortDirectionEnum, SortFieldsEnum } from '../enums';
import { Type } from 'class-transformer';

export class FindAllProjectsDto {
  @ApiProperty({
    example: 1,
    description: 'Страница начиная с 0',
    default: 0,
    minimum: 0,
    required: false,
  })
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Количество объектов на странице',
    required: false,
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  size: number;

  @ApiProperty({
    example: 'Dubai',
    description: 'Строка поиска',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  searchString: string;

  @ApiProperty({
    enum: SortFieldsEnum,
    description: 'Имя поля, по которому производится поиск',
    required: false,
    default: SortFieldsEnum.DateUpdate,
  })
  @IsOptional()
  @IsEnum(SortFieldsEnum)
  @IsNotEmpty()
  sortField: SortFieldsEnum;

  @ApiProperty({
    enum: SortDirectionEnum,
    description:
      'Направление сортировки(asc - по возрастанию, desc - по убыванию)',
    required: false,
    default: SortDirectionEnum.ASC,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortDirectionEnum)
  sortDirection: SortDirectionEnum;
}
