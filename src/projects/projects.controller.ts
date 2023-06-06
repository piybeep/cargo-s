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
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/token.guard';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProjectDto,
  CreateProjectResponseDto,
  FindAllProjectsDto,
  GetAllProjectsResponseDto,
  GetOneProjectDto,
  UpdateProjectDto,
} from './dto';
import { ProjectsService } from './projects.service';
import { Project } from './entities/projects.entity';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @ApiOperation({ summary: 'Получение всех проектов пользователя' })
  @ApiQuery({
    name: 'page',
    description: 'Номер страницы начиная с 0',
    required: false,
  })
  @ApiQuery({
    name: 'size',
    description: 'Количество объектов на странице',
    required: false,
  })
  @ApiQuery({
    name: 'searchString',
    description: 'Строка поиска',
    required: false,
  })
  @ApiQuery({
    name: 'sortField',
    description: 'Поле сортировки',
    required: false,
  })
  @ApiQuery({
    name: 'sortDirection',
    description: 'Направление сортировки',
    required: false,
  })
  //TODO: ВЫПИЛИТЬ НА ПРОДЕ
  @ApiQuery({ name: 'userId', description: 'Id пользователя' })
  @ApiResponse({ status: 200, type: GetAllProjectsResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Get()
  async getProjects(
    @Query() data: FindAllProjectsDto,
    // @Req() req: Request,
  ): Promise<GetAllProjectsResponseDto> {
    return await this.projectsService.getProjects(data /* req.user */);
  }

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiBody({ type: CreateProjectDto, description: 'Имя проекта' })
  @ApiResponse({ status: 201, type: CreateProjectResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Post()
  async createProject(
    @Body() data: CreateProjectDto,
    @Req() req: Request,
  ): Promise<Project> {
    return await this.projectsService.createProject(data /* , req.user */);
  }

  @ApiOperation({ summary: 'Обновление имени проекта' })
  @ApiParam({
    name: 'id',
    description: 'Id проекта',
    example: '26d30416-170e-4710-adaa-013216a2f48d',
  })
  @ApiBody({
    type: UpdateProjectDto,
  })
  @ApiResponse({ status: 200, type: Project })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Put(':id')
  async updateProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProjectDto,
  ) {
    return await this.projectsService.updateProject(id, data);
  }

  @ApiOperation({ summary: 'Получение проекта по Id' })
  @ApiParam({
    name: 'id',
    description: 'Id проекта',
    example: '26d30416-170e-4710-adaa-013216a2f48d',
  })
  @ApiResponse({ status: 200, type: GetOneProjectDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Get(':id')
  async getProject(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectsService.getProject(id);
  }

  @ApiOperation({ summary: 'Удаление проекта' })
  @ApiParam({
    name: 'id',
    description: 'Id проекта',
    example: '26d30416-170e-4710-adaa-013216a2f48d',
  })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @ApiCookieAuth('token')
  //@UseGuards(JwtGuard)
  @Delete(':id')
  async deleteProject(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
