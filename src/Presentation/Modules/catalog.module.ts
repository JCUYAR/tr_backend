import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddCategoryCommandHandler } from 'src/Domain/Feature/Commands/Handlers/AddCategoryCommandHandler';
import { Area } from 'src/Model/Entities/area.entity';
import { Category } from 'src/Model/Entities/category.entity';
import { Status } from 'src/Model/Entities/status.entity';
import { CategoryRepository } from 'src/Repository/Interface/CategoryRepository';
import { CatalogController } from '../Controllers/CatalogController';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Area,
      Status,
    ]),
    CqrsModule,
  ],
  controllers: [
    CatalogController
  ],
  providers: [
    AddCategoryCommandHandler,
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    }
  ],
  exports: [],
})
export class CatalogModule {}