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
    AddStatusCommandHandler,
    {
      provide: 'IStatusRepository',
      useClass: StatusRepository,
    },
    AddAreaCommandHandler,
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