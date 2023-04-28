import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { TransportsModule } from 'src/transports/transports.module';
import { CargosController } from './cargos.controller';
import { CargoService } from './cargos.service';
import { Cargo } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo]), TransportsModule, GroupsModule],
  controllers: [CargosController],
  providers: [CargoService],
})
export class CargosModule {}
