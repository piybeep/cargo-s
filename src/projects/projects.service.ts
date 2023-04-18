import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllProjectsDto } from './dto';
import { Project } from './entities/projects.entity';
import { SortDirectionEnum, SortFieldsEnum } from './enums';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getProjects(
    data: FindAllProjectsDto,
    user: any,
  ): Promise<[Project[], number] | []> {
    const userId = user.sub;
    if (!data.searchString) data.searchString = '';
    if (!data.sortDirection) data.sortDirection = SortDirectionEnum.ASC;
    if (!data.sortField) data.sortField = SortFieldsEnum.DateUpdate;
    if (!data.page) data.page = 0;
    if (!data.size) data.size = 20;

    const projects: [Project[], number] =
      await this.projectRepository.findAndCount({
        where: { userId, name: Like(`%${data.searchString}%`) },
        order: { [data.sortField]: data.sortDirection },
        skip: data.page * data.size,
        take: data.size,
      });
    if (!projects || projects[0].length === 0) {
      return [];
    }
    return projects;
  }
}
