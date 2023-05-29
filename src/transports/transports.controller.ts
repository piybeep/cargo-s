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
import {
  CreateLoadSpaceDto,
  CreateLoadSpaceResponseDto,
  CreateTransportResponseDto,
  GetAllFilteredPaginationResponseDto,
  UpdateLoadSpaceDto,
  UpdateTransportDto,
} from './dto';
import { LoadSpace, Transport } from './entities';
import { TransportsService } from './transports.service';

@ApiTags('Транспорт')
@Controller()
export class TransportsController {
  constructor(private readonly transportsService: TransportsService) {}

  @ApiOperation({ summary: 'Создание грузового пространства' })
  @ApiResponse({ status: 201, type: CreateLoadSpaceResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Post('loadspaces')
  async createTransport(@Body() data: CreateLoadSpaceDto) {
    return await this.transportsService.createLoadSpace(data);
  }

  @ApiOperation({
    summary: 'Получение всех грузовых площадей с фильтрацией шаблонов',
  })
  @ApiQuery({
    name: 'tmp',
    required: false,
    description: 'получение шаблонов грузовых пространств',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'номер страницы'
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'размер страницы'
  })
  @ApiResponse({ status: 200, type: [LoadSpace] })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Get('loadspaces')
  async getAllFiltered(@Query('page') page: number = 0, @Query('size') size: number=10, @Query('tmp') tmp = false): Promise<GetAllFilteredPaginationResponseDto> {
    return await this.transportsService.getAllFiltered(page, size, tmp);
  }

  @ApiOperation({ summary: 'Получение грузового пространства по id' })
  @ApiParam({ name: 'id', description: 'Id грузового пространства' })
  @ApiResponse({ status: 200, type: CreateLoadSpaceResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Get('loadSpaces/:id')
  async getOneLoadSpace(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LoadSpace> {
    return await this.transportsService.getOneLoadSpace(id);
  }

  @ApiOperation({ summary: 'Обновление данных грузового пространства' })
  @ApiParam({ name: 'id', description: 'Id грузового пространства' })
  @ApiBody({ type: UpdateLoadSpaceDto })
  @ApiResponse({ status: 200, type: CreateLoadSpaceResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Put('loadSpaces/:id')
  async updateLoadSpace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateLoadSpaceDto,
  ) {
    return await this.transportsService.updateLoadSpace(id, data);
  }

  @ApiOperation({ summary: 'Удаление грузового пространства' })
  @ApiParam({ name: 'id', description: 'Id транспорта' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Delete('loadSpaces/:id')
  async deleteLoadSpace(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportsService.deleteLoadSpace(id);
  }

  @ApiOperation({ summary: 'Получение транспорта по id' })
  @ApiParam({ name: 'id', description: 'Id транпорта' })
  @ApiResponse({ status: 200, type: CreateTransportResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Get('transports/:id')
  async getOneTransport(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Transport> {
    return await this.transportsService.getOneTransport(id);
  }

  @ApiOperation({ summary: 'Обновление данных транспорта' })
  @ApiParam({ name: 'id', description: 'Id транспорта' })
  @ApiBody({ type: UpdateTransportDto })
  @ApiResponse({ status: 200, type: CreateTransportResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Put('transports/:id')
  async updateTransport(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTransportDto,
  ) {
    return await this.transportsService.updateTransport(id, data);
  }

  @ApiOperation({ summary: 'Удаление транспорта' })
  @ApiParam({ name: 'id', description: 'Id транспорта' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Delete('transports/:id')
  async deleteTransport(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportsService.deleteTransport(id);
  }
}
