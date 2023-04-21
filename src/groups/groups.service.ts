import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UpdateGroupDto } from './dto';
import { Group } from './entities';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private readonly projectsService: ProjectsService,
  ) {}
  //СОЗДАНИЕ ГРУППЫ ПРОЕКТА
  async createGroup(data: string) {
    const project = await this.projectsService.getProject(data);
    if (!project) {
      throw new BadRequestException(`Project ${data} not found`);
    }
    const groupMaxPosition = await this.groupRepository.find({
      select: ['position'],
      where: { projectId: data },
      order: {
        position: 'DESC',
      },
      take: 1,
    });
    let position = 1;
    if (groupMaxPosition.length !== 0 && groupMaxPosition[0].position) {
      position = groupMaxPosition[0].position + 1;
    }
    const name = `Получатель без названия ${position}`;

    const group = this.groupRepository.save({
      name,
      position,
      projectId: data,
    });
    return group;
  }
  //ПОЛУЧЕНИЕ СОРТИРОВАННОГО СПИСКА ГРУПП ОДНОГО ПРОЕКТА
  async getAllGroups(projectId: string, searchString: string) {
    //TODO: сделать поиск по названию груза
    const groups = await this.groupRepository.find({
      where: { projectId },
      order: { position: 'ASC' },
    });
    return groups;
  }

  //ОБНОВЛЕНИЕ ИНФОРМАЦИИ ГРУППЫ
  async updateGroup(id: string, data: UpdateGroupDto) {
    const _group = await this.groupRepository.findBy({ id });
    if (!_group[0]) {
      throw new BadRequestException('No such group');
    }
    if (data.name) {
      if (
        !(await this.checkDuplicateName(id, _group[0].projectId, data.name))
      ) {
        throw new BadRequestException(`Group ${data.name} already exists`);
      }
    }
    const group = await this.groupRepository.update({ id }, data);
    if ((group.affected = 0)) {
      throw new InternalServerErrorException('Updating Failed');
    }
    return await this.groupRepository.findOneBy({ id });
  }

  //ПРОВЕРКА НА ПОВТОРЯЮЩЕЕСЯ ИМЯ ГРУППЫ В ОДНОМ ПРОЕКТЕ
  async checkDuplicateName(
    groupId: string,
    projectId: string,
    name: string,
  ): Promise<boolean> {
    const group = await this.groupRepository.find({
      where: { name: name, projectId, id: Not(groupId) },
    });
    if (group.length > 0) return false;
    else return true;
  }

  //КАСКАДНОЕ УДАЛЕНИЕ ГРУППЫ
  async deleteGroup(groupId: string) {
    //TODO: сделать каскадное удаление
    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) throw new BadRequestException('No such group');
    return await this.groupRepository.delete({ id: groupId });
  }
}
