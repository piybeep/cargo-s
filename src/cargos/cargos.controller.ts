import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CargoService } from './cargos.service';
import { CreateCargoDto, UpdateCargoDto } from './dto';

@ApiTags('Грузы')
@Controller('cargos')
export class CargosController {
  constructor(private readonly cargoService: CargoService) {}

  @ApiOperation({ summary: 'Получение всех грузов одной группы без шаблонов' })
  @Get('byGroup')
  @ApiQuery({ name: 'groupId', description: 'Id группы' })
  async getCargosByGroup(@Query('groupId', ParseUUIDPipe) groupId: string) {}

  @ApiOperation({ summary: 'Получение всех шаблонов-грузов' })
  @Get('tmp')
  async getCargosTemplates() {}

  @ApiOperation({ summary: 'Получение одного груза' })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Id груза' })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {}

  @ApiOperation({ summary: 'Создание груза или его шаблона' })
  @Post()
  @ApiBody({ type: CreateCargoDto })
  async createCargo(@Body() data: CreateCargoDto) {}

  @ApiOperation({ summary: 'Обновление груза' })
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Id груза' })
  @ApiBody({ type: UpdateCargoDto })
  async updateCargo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCargoDto,
  ) {}

  @ApiOperation({ summary: 'Удаление одного груза' })
  @ApiParam({ name: 'id', description: 'Id груза' })
  @Delete(':id')
  async deleteCargo(@Param('id', ParseUUIDPipe) id: string) {}
}
