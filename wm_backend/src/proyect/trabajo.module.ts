import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrabajoSchema } from "./entities/trabajo.entity";
import { TrabajoController } from "./trabajo.controller";
import { TrabajoService } from "./trabajo.service";
import { EquipoService } from "src/team/equipo.service";
import { EquipoSchema } from "src/team/entities/equipo.entity";
import { UserModule } from "src/users/user.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name:'Trabajo', schema: TrabajoSchema}]),
        MongooseModule.forFeature([{name:'Equipo', schema: EquipoSchema}]),
        UserModule,
    ],
    controllers: [TrabajoController],
    providers: [TrabajoService, EquipoService],
    exports: [TrabajoService]
})
export class TrabajoModule {}