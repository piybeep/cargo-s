import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectDto,
  FindAllProjectsDto,
  GetAllProjectsResponseDto,
  UpdateProjectDto,
} from './dto';
import { Project } from './entities/projects.entity';
import { SortDirectionEnum, SortFieldsEnum } from './enums';
import { UserService } from 'src/users/users.service';
import { GetOneProjectDto } from './dto/get-one.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
  ) {}

  async getProjects(
    data: FindAllProjectsDto,
    /* user: any, */
  ): Promise<GetAllProjectsResponseDto> {
    // if(user.sub)
    // const userId = user.sub;
    const { userId } = data;
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
    return { data: projects[0], count: projects[1], page: data.page};
  }

  async createProject(data: CreateProjectDto /* , user */): Promise<Project> {
    const _user = await this.userService.findOne({
      id: data.userId,
      /* user.sub */
    });
    if (!_user) throw new UnauthorizedException('no such user');
    const project: Project = await this.projectRepository.save({
      name: data.name,
      user: _user,
    });
    delete project.user.code;
    delete project.user.password;
    return project;
  }

  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findBy({ id });
    if (project.length == 0) {
      throw new BadRequestException(`Проект ${id} не найден`);
    }
    const { affected } = await this.projectRepository.update(
      { id },
      { name: data.name },
    );
    if (affected === 0)
      throw new InternalServerErrorException(`Updation failed`);
    return await this.projectRepository.findOneBy({ id });
  }

  async getProject(id: string): Promise<GetOneProjectDto> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!project) throw new BadRequestException(`Project ${id} not found`);
    delete project?.user?.password;
    delete project?.user?.code;
    return project;
  }

  async deleteProject(id: string) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) throw new BadRequestException(`Project ${id} not found`);
    await this.projectRepository.delete({ id });
  }
}
