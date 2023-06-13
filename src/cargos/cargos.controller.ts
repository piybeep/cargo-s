import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/token.guard';
import { CargoService } from './cargos.service';
import { CreateCargoDto, UpdateCargoDto } from './dto';
import { Cargo } from './entities';

@ApiTags('Грузы')
@ApiCookieAuth('token')
//@UseGuards(JwtGuard)
@Controller('/groups/:groupId/cargos')
export class CargosController {
  constructor(private readonly cargoService: CargoService) {}

  @ApiOperation({ summary: 'Получение всех грузов одной группы' })
  @Get()
  @ApiParam({
    name: 'groupId',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id группы',
  })
  @ApiQuery({
    name: 'templates',
    example: true,
    description: 'получение шаблонов грузов',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'номер страницы',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'размер страницы',
  })
  @ApiResponse({ status: 200, type: [Cargo] })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  async getCargosByGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Query('templates', ParseBoolPipe) templates: boolean,
    @Query('page') page: number = 0,
    @Query('size') size: number = 10,
  ) {
    if (templates) return this.cargoService.getTemplates(+page, +size);
    else return this.cargoService.getAllByGroup(groupId);
  }

  @ApiOperation({ summary: 'Получение одного груза' })
  @Get(':id')
  @ApiParam({
    name: 'groupId',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id группы',
  })
  @ApiResponse({ status: 200, type: Cargo })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cargoService.getOne(id);
  }

  @ApiOperation({ summary: 'Создание груза' })
  @Post()
  @ApiParam({
    name: 'groupId',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id группы',
    required: false,
  })
  @ApiBody({ type: CreateCargoDto })
  @ApiResponse({ status: 201, type: Cargo })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  async createCargo(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Body() data: CreateCargoDto,
  ) {
    return this.cargoService.createCargo(data, groupId);
  }

  @ApiOperation({ summary: 'Обновление груза' })
  @Put(':id')
  @ApiParam({
    name: 'id',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id груза',
  })
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
