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
import { ProjectsService } from './projects.service';
import { Project } from './entities/projects.entity';
import {
  CreateProjectDto,
  FindAllProjectsDto,
  GetAllProjectsResponseDto,
} from './dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/token.guard';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @ApiOperation({ summary: 'Получение всех проектов пользователя' })
  @ApiQuery({ name: 'page', description: 'Номер страницы начиная с 0' })
  @ApiQuery({ name: 'size', description: 'Количество объектов на странице' })
  @ApiQuery({ name: 'searchString', description: 'Строка поиска' })
  @ApiQuery({ name: 'sortField', description: 'Поле сортировки' })
  @ApiQuery({ name: 'sortDirection', description: 'Направление сортировки' })

  //TODO: ДОПИСАТЬ ДОКУ
  @ApiResponse({ status: 200, description: '' })
  @UseGuards(JwtGuard)
  @Get('all')
  async getProjects(
    @Query() data: FindAllProjectsDto,
    @Req() req: Request,
  ): Promise<GetAllProjectsResponseDto> {
    return await this.projectsService.getProjects(data, req.user);
  }

  @ApiOperation({ summary: 'Создание проекта' })
  //TODO: ДОПИСАТЬ ДОКУ
  @UseGuards(JwtGuard)
  @Post()
  async createProject(
    @Body() data: CreateProjectDto,
    @Req() req: Request,
  ): Promise<Project> {
    return await this.projectsService.createProject(data, req.user);
  }

  @ApiOperation({ summary: 'Обновление имени проекта' })
  @Put(':id')
  async updateProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreateProjectDto,
  ) {
    return await this.projectsService.updateProject(id, data);
  }

  @ApiOperation({ summary: 'Получение проекта по Id'})
  @Get(':id')
  async getProject(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectsService.getProject(id);
  }

  @ApiOperation({ summary: ''})
  @Delete(':id')
  async deleteProject(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectsService.deleteProject(id);
  }
}
