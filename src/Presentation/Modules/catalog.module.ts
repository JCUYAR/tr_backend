import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from 'src/Model/Entities/area.entity';
import { Status } from 'src/Model/Entities/status.entity';
import { CatalogController } from '../Controllers/CatalogController';
import { StatusRepository } from 'src/Repository/Implementation/StatusRepository';
import { AreaRepository } from 'src/Repository/Implementation/AreaRepository';
import { AddStatusCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Status/AddStatusCommandHandler';
import { AddAreaCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Area/AddAreaCommandHandler';
import { ListAllAreaQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Area/ListAllAreaQueryHandler';
import { ListAllStatusQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Status/ListAllStatusQueryHandler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Area,
      Status,
    ]),
    CqrsModule,
  ],
  controllers: [
    CatalogController
  ],
  providers: [

    // Status
    AddStatusCommandHandler,
    ListAllStatusQueryHandler,
    {
      provide: 'IStatusRepository',
      useClass: StatusRepository,
    },

    // Area
    AddAreaCommandHandler,
    ListAllAreaQueryHandler,
    {
      provide: 'IAreaRepository',
      useClass: AreaRepository,
    },
  ],
  exports: [
    'IStatusRepository',
    'IAreaRepository',
  ],
})
export class CatalogModule {}