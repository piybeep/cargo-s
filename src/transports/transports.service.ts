import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateLoadSpaceDto,
  CreateTransportDto,
  GetAllFilteredPaginationResponseDto,
  UpdateLoadSpaceDto,
  UpdateTransportDto,
} from './dto';
import { LoadSpace, Transport } from './entities';
import { LoadSpaceTypes, SizeUnits, WeightUnits } from './enums';

@Injectable()
export class TransportsService {
  constructor(
    @InjectRepository(Transport)
    private readonly transportRepository: Repository<Transport>,
    @InjectRepository(LoadSpace)
    private readonly loadSpaceRepository: Repository<LoadSpace>,
  ) {}

  //СОЗДАНИЕ ГРУЗОВОГО ПРОСТРАНСТВА С ТРАНСПОРТОМ
  async createLoadSpace(data: CreateLoadSpaceDto) {
    const { autoDistribution, ..._data } = data;

    if (
      data.type === LoadSpaceTypes.Truck &&
      !autoDistribution &&
      data.transports
    ) {
      _data.transports = _data.transports.map((el) => ({
        weightUnit: _data.weightUnit || WeightUnits.Kg,
        sizeUnit: _data.sizeUnit || SizeUnits.M,
        ...el,
      }));
    } else {
      _data.transports = [];
    }

    const loadSpace = await this.loadSpaceRepository.save(_data);

    return await this.loadSpaceRepository.findOne({
      where: { id: loadSpace.id },
      relations: ['transports'],
    });
  }

  //СОЗДАНИЕ ТРАНСПОРТА
  async createTransport(
    data: CreateTransportDto | CreateTransportDto[],
  ): Promise<CreateTransportDto[] & Transport[]> {
    const transport: any = this.transportRepository.save(data);

    return transport;
  }

  //ПОЛУЧЕНИЕ ВСЕХ ГРУЗОВЫХ ПРОСТРАНСТВ
  async getAllFiltered(
    page: number,
    size: number,
    tmp = false,
  ): Promise<GetAllFilteredPaginationResponseDto> {
    const loadSpaces = await this.loadSpaceRepository.find({
        where: { isTemplate: tmp },
        // relations: { transports: false },
        take: size,
        skip: size * page,
      }),
      itemCount = await this.loadSpaceRepository.count({
        where: { isTemplate: tmp },
      });
    return {
      data: loadSpaces,
      page,
      itemCount,
      pageCount: Math.ceil(itemCount / size),
    };
  }

  //ПОЛУЧЕНИЕ ГРУЗОВОГО ПРОСТРАНСТВА ПО ID
  async getOneLoadSpace(id: string) {
    return await this.loadSpaceRepository.findOne({
      where: { id },
      relations: { transports: true },
    });
  }

  //ПОЛУЧЕНИЕ ТРАНСПОРТА ПО ID
  async getOneTransport(id: string) {
    return await this.transportRepository.findOne({
      where: { id },
    });
  }

  //ОБНОВЛЕНИЕ ГРУЗОВОГО ПРОСТРАНСТВА
  async updateLoadSpace(id: string, data: UpdateLoadSpaceDto) {
    const loadSpace = await this.loadSpaceRepository.findOneBy({ id });
    if (!loadSpace) throw new BadRequestException(`Load space ${id} not found`);

    for (const key in data) {
      loadSpace[key] = data[key];
    }
    if (data.type === LoadSpaceTypes.Truck) {
      if (!data.autoDistribution) {
        if (!data.transports) {
          throw new BadRequestException('transports is required');
        }
        data.transports.forEach((el) => {
          el.weightUnit = data.weightUnit || WeightUnits.Kg;
          el.sizeUnit = data.sizeUnit || SizeUnits.M;
        });
        loadSpace.transports = data.transports;
      } else {
        loadSpace.transports = [];
      }
    } else if (data.type === loadSpace.type) {
      loadSpace.transports = [];
    }

    await this.loadSpaceRepository.save(loadSpace);

    return await this.loadSpaceRepository.findOne({
      where: { id },
      relations: { transports: true },
    });
  }

  //ОБНОВЛЕНИЕ ТРАНПОРТА
  async updateTransport(id: string, data: UpdateTransportDto) {
    if (!(await this.transportRepository.findOneBy({ id })))
      throw new BadRequestException(`Transport ${id} not found`);

    const updateResult = await this.transportRepository.update({ id }, data);

    if (updateResult.affected == 0)
      throw new InternalServerErrorException('Updating failed');

    return await this.transportRepository.findOneBy({ id });
  }

  //УДАЛЕНИЕ ГРУЗОВОГО ПРОСТРАНСТВА
  async deleteLoadSpace(id: string) {
    const loadSpace = await this.loadSpaceRepository.findOne({
      where: { id },
      relations: { transports: true },
    });
    loadSpace.transports.forEach((el) => {
      this.transportRepository.delete({ id: el.id });
    });
    return await this.loadSpaceRepository.delete({ id });
  }
  //УДАЛЕНИЕ ТРАНПОРТА
  async deleteTransport(id: string) {
    return await this.transportRepository.delete({ id });
  }
}
