import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tareo } from 'src/Model/Entities/tareo.entity';
import { TareoRepository } from 'src/Repository/Implementation/TareoRepository';
import { GetListTareoQueryHandler } from 'src/Domain/Feature/Queries/Handlers/GetListTareoQueryHandler';
import { TareoController } from '../Controllers/TareoController';

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
    GetListTareoQueryHandler,
    {
      provide: 'ITareoRepository',
      useClass: TareoRepository,
    }
  ],
  exports: [],
})
export class TareoModule {}