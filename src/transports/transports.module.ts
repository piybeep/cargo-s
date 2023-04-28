import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from './entities';
import { LoadSpace } from './entities/loadSpace.entity';
import { TransportsController } from './transports.controller';
import { TransportsService } from './transports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transport, LoadSpace])],
  controllers: [TransportsController],
  providers: [TransportsService],
  exports: [TransportsService]
})
export class TransportsModule {}
