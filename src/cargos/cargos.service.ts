import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { TransportsService } from 'src/transports/transports.service';
import { Repository } from 'typeorm';
import { CreateCargoDto, UpdateCargoDto } from './dto';
import { Cargo } from './entities';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    private readonly groupService: GroupsService,
    private readonly transportService: TransportsService,
  ) {}

  async getAllByGroup(groupId: string) {
    const cargos = await this.cargoRepository.find({
      where: { groupId, isTemplate: false },
    });
    return cargos;
  }

  async getTemplates() {
    return await this.cargoRepository.find({ where: { isTemplate: true } });
  }

  async getOne(id: string) {
    const cargo = await this.cargoRepository.findOne({
      where: { id },
      relations: { group: true, loadSpace: true },
    });
    if (!cargo) throw new BadRequestException(`cargo ${id} not found`);
    return cargo;
  }

  async createCargo(data: CreateCargoDto, groupId: string) {
    let loadSpaces, groups;
    if (groupId) {
      const group = await this.groupService.getOne(groupId);
      if (!group || group.length === 0) {
        throw new BadRequestException(`group ${groupId} not found`);
      }
      groups = group;
    }
    if (data.loadSpaceId) {
      const loadSpace = await this.transportService.getOneLoadSpace(
        data.loadSpaceId,
      );
      if (!loadSpace) {
        throw new BadRequestException(
          `transport ${data.loadSpaceId} not found`,
        );
      }
      loadSpaces = [loadSpace];
    }
    const res = await this.cargoRepository.save({
      ...data,
      groupId,
      loadSpaces,
      groups,
    });

    console.log(res);
    return await this.cargoRepository.findOneBy(res.id);
  }

  async updateCargo(id: string, data: UpdateCargoDto) {
    const cargo = await this.cargoRepository.findOne({ where: { id } });
    if (!cargo) {
      throw new BadRequestException(`Cargo ${id} not found`);
    }
    for (const key in data) {
      cargo[key] = data[key];
    }

    console.log(cargo);
    await this.cargoRepository.save(cargo);
    return await this.cargoRepository.findOne({
      where: { id },
      relations: { loadSpace: true, group: true },
    });
  }

  async deleteCargo(id: string) {
    const cargo = await this.cargoRepository.findOneBy({ id });
    if (!cargo) {
      throw new BadRequestException(`Cargo ${id} not found`);
    }
    const deleteResult = await this.cargoRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new InternalServerErrorException(`Deleting failed`);
    }
  }
}
