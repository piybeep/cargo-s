import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectDto,
  FindAllProjectsDto,
  GetAllProjectsResponseDto,
} from './dto';
import { Project } from './entities/projects.entity';
import { SortDirectionEnum, SortFieldsEnum } from './enums';
import { request } from 'express';
import { UserService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
  ) {}

  async getProjects(
    data: FindAllProjectsDto,
    user: any,
  ): Promise<GetAllProjectsResponseDto> {
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
    return { data: projects[0], count: projects[1] };
  }

  async createProject(data: CreateProjectDto, user): Promise<Project> {
    const _user = await this.userService.findOne({ id: user.sub });
    if (!_user) throw new UnauthorizedException();
    const isProjectExist = await this.projectRepository.findBy({
      name: data.name,
    });
    if (isProjectExist.length > 0)
      throw new BadRequestException(`Проект ${data.name} уже существует`);
    const project: Project = await this.projectRepository.save({
      name: data.name,
      user: _user,
    });
    delete project.user.code;
    delete project.user.password;
    return project;
  }

  async updateProject(id: string, data: CreateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findBy({ id });
    if (project.length == 0) {
      throw new BadRequestException(`Проект ${id} не найден`);
    }
    const isProjectExist = await this.projectRepository.findOneBy({
      name: data.name,
    });
    if (isProjectExist && isProjectExist.id !== id)
      throw new BadRequestException(`Проект ${data.name} уже существует`);

    const { affected } = await this.projectRepository.update(
      { id },
      { name: data.name },
    );
    if (affected === 0)
      throw new InternalServerErrorException(`Updation failed`);
    return await this.projectRepository.findOneBy({ id });
  }

  async getProject(id: string): Promise<Project> {
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async deleteProject(id: string){
    await this.projectRepository.delete({id})
  }
}
