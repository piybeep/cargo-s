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
import { UpdateGroupDto } from './dto';
import { GroupsService } from './groups.service';
import { Group } from 'src/groups/entities';
import { JwtGuard } from 'src/auth/guards/token.guard';

@ApiTags('Группы')
@Controller('projects/:projectId/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @ApiCookieAuth('token')
  @ApiOperation({
    summary: 'Создание группы',
  })
  @ApiParam({
    name: 'projectId',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id проекта',
  })
  @ApiResponse({ status: 201, type: Group })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @UseGuards(JwtGuard)
  @Post()
  async createGroup(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return await this.groupsService.createGroup(projectId);
  }

  @ApiCookieAuth('token')
  @ApiOperation({
    summary: 'Поиск групп проекта по грузам в них',
  })
  @ApiParam({
    name: 'projectId',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id проекта',
  })
  @ApiQuery({
    name: 'searchString',
    description: 'строка поиска',
    example: 'груз231321',
  })
  @ApiResponse({ status: 201, type: [Group] })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @UseGuards(JwtGuard)
  @Get()
  async searchGroups(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query('searchString') searchString: string,
  ) {
    if (!!searchString) {
      return await this.groupsService.searchGroups(projectId, searchString);
    } else {
      return await this.groupsService.getAllGroups(projectId);
    }
  }

  // @ApiCookieAuth('token')
  // @ApiOperation({
  //   summary: 'Получение всех групп проекта',
  // })
  // @ApiParam({
  //   name: 'projectId',
  //   example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
  //   description: 'Id проекта',
  // })
  // @ApiResponse({ status: 201, type: [Group] })
  // @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  // @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  // @UseGuards(JwtGuard)
  // @Get()
  // async getAllGroups(@Param('projectId', ParseUUIDPipe) projectId: string) {
  //   return await this.groupsService.getAllGroups(projectId);
  // }

  @ApiCookieAuth('token')
  @ApiOperation({
    summary: 'Обновление имени, видимости и позиции группы',
  })
  @ApiParam({
    name: 'id',
    description: 'Id группы',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
  })
  @ApiParam({
    name: 'projectId',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id проекта',
  })
  @ApiBody({
    type: UpdateGroupDto,
  })
  @ApiResponse({ status: 200, type: Group })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateGroup(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    data: UpdateGroupDto,
  ) {
    return await this.groupsService.updateGroup(id, data);
  }

  @ApiCookieAuth('token')
  @ApiOperation({
    summary: 'Удаление группы с ее грузами',
  })
  @ApiParam({
    name: 'projectId',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
    description: 'Id проекта',
  })
  @ApiParam({
    name: 'id',
    description: 'Id группы',
    example: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
  })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteGroup(@Param('id', ParseUUIDPipe) id: string) {
    return await this.groupsService.deleteGroup(id);
  }
}
