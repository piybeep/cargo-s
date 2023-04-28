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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CargoService } from './cargos.service';
import { CreateCargoDto, UpdateCargoDto } from './dto';
import { Cargo } from './entities';

@ApiTags('Грузы')
@Controller('cargos')
export class CargosController {
  constructor(private readonly cargoService: CargoService) {}

  @ApiOperation({ summary: 'Получение всех грузов одной группы без шаблонов' })
  @Get('byGroup')
  @ApiQuery({ name: 'groupId', description: 'Id группы' })
  @ApiResponse({ status: 200, type: [Cargo] })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  async getCargosByGroup(@Query('groupId', ParseUUIDPipe) groupId: string) {
    return this.cargoService.getAllByGroup(groupId);
  }

  @ApiOperation({ summary: 'Получение всех шаблонов-грузов' })
  @Get('tmp')
  @ApiResponse({ status: 200, type: [Cargo] })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  async getCargosTemplates() {
    return this.cargoService.getTemplates();
  }

  @ApiOperation({ summary: 'Получение одного груза' })
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Id груза' })
  @ApiResponse({ status: 200, type: Cargo })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cargoService.getOne(id);
  }

  @ApiOperation({ summary: 'Создание груза или его шаблона' })
  @Post()
  @ApiBody({ type: CreateCargoDto })
  @ApiResponse({ status: 201, type: Cargo })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  async createCargo(@Body() data: CreateCargoDto) {
    return this.cargoService.createCargo(data);
  }

  @ApiOperation({ summary: 'Обновление груза' })
  @Put(':id')
  @ApiParam({ name: 'id', description: 'Id груза' })
  @ApiBody({ type: UpdateCargoDto })
  @ApiResponse({ status: 200, type: Cargo })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  async updateCargo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCargoDto,
  ) {
    return this.cargoService.updateCargo(id, data);
  }

  @ApiOperation({ summary: 'Удаление одного груза' })
  @ApiParam({ name: 'id', description: 'Id груза' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @Delete(':id')
  async deleteCargo(@Param('id', ParseUUIDPipe) id: string) {
    return this.cargoService.deleteCargo(id);
  }
}
