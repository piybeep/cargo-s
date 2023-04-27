import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CargosController } from "./cargos.controller";
import { CargoService } from "./cargos.service";
import { Cargo } from "./entities";

@Module({
    imports:[TypeOrmModule.forFeature([Cargo])],
    controllers: [CargosController],
    providers: [CargoService]
})

export class CargosModule{}