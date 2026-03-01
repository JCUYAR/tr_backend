import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tareo } from 'src/Model/Entities/tareo.entity';
import { TareoRepository } from 'src/Repository/Implementation/TareoRepository';
import { GetListTareoQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Tareo/GetListTareoQueryHandler';
import { TareoController } from '../Controllers/TareoController';
import { GetListTareoByUserQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Tareo/GetListTareoByUserQueryHandler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tareo
    ]),
    CqrsModule,
  ],
  controllers: [
    TareoController
  ],
  providers: [
    GetListTareoQueryHandler, GetListTareoByUserQueryHandler,
    {
      provide: 'ITareoRepository',
      useClass: TareoRepository,
    }
  ],
  exports: [],
})
export class TareoModule {}