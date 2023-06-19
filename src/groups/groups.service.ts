import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { UpdateGroupDto } from './dto';
import { Group } from './entities';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private readonly projectsService: ProjectsService,
  ) {}
  //СОЗДАНИЕ ГРУППЫ ПРОЕКТА
  async createGroup(data: string) {
    const project = await this.projectsService.getProject(data);
    console.log(project, data);

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

  //ПОЛУЧЕНИЕ ОДНОЙ ГРУППЫ
  async getOne(id: string) {
    return await this.groupRepository.findOneBy({ id });
  }

  //ПОЛУЧЕНИЕ СОРТИРОВАННОГО СПИСКА ГРУПП ОДНОГО ПРОЕКТА
  async getAllGroups(projectId: string) {
    const groups = await this.groupRepository.find({
      where: { projectId },
      relations: { cargos: true },
      order: { position: 'ASC' },
    });
    return groups;
  }
  //ПОИСК ГРУПП
  async searchGroups(projectId: string, searchString: string) {
    return await this.groupRepository.find({
      where: {
        projectId,
        cargos: { name: ILike('%' + searchString + '%') },
      },
      relations: { cargos: true },
      order: { position: 'ASC' },
    });
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
    const deleteResult = await this.groupRepository.delete({ id: groupId });
    if (deleteResult.affected !== 0) return;
    throw new InternalServerErrorException('deleting failed');
  }
}
