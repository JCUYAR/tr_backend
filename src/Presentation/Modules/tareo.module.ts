import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tareo } from 'src/Model/Entities/tareo.entity';
import { TareoRepository } from 'src/Repository/Implementation/TareoRepository';
import { GetListTareoQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Tareo/GetListTareoQueryHandler';
import { TareoController } from '../Controllers/TareoController';
import { GetListTareoByUserQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Tareo/GetListTareoByUserQueryHandler';
import { AddTareoCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Tareo/AddTareoCommandHandler';
import { UserModule } from './user.module';
import { CatalogModule } from './catalog.module';
import { CategoryModule } from './category.module';
import { UpdateTareoCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Tareo/UpdateTareoCommandHandler';
import { GetOneTareoQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Tareo/GetOneTareoQueryHandler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tareo
    ]),
    CqrsModule,
    UserModule,
    CatalogModule,
    CategoryModule,
  ],
  controllers: [
    TareoController
  ],
  providers: [
    GetListTareoQueryHandler, 
    GetListTareoByUserQueryHandler,
    GetOneTareoQueryHandler,
    AddTareoCommandHandler,
    UpdateTareoCommandHandler,
    {
      provide: 'ITareoRepository',
      useClass: TareoRepository,
    }
  ],
  exports: [],
})
export class TareoModule {}