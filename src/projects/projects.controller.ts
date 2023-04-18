import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/projects.entity';
import { FindAllProjectsDto } from './dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  
  @ApiOperation({ summary: 'Получение всех проектов пользователя' })
  @ApiQuery({ name: 'page', description: 'Номер страницы начиная с 0' })
  @ApiQuery({ name: 'size', description: 'Количество объектов на странице' })
  @ApiQuery({ name: 'searchString', description: 'Строка поиска' })
  @ApiQuery({ name: 'sortField', description: 'Поле сортировки' })
  @ApiQuery({ name: 'sortDirection', description: 'Направление сортировки' })
  
  // @UseGuards(JwtGuard))
  @Get('all')
  async getProjects(
    @Query() data: FindAllProjectsDto,
    @Req() req: Request,
  ): Promise<[Project[], number] | []> {
    return await this.projectsService.getProjects(data, req.user);
  }
}
