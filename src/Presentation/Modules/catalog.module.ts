import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddCategoryCommandHandler } from 'src/Domain/Feature/Commands/Handlers/AddCategoryCommandHandler';
import { Area } from 'src/Model/Entities/area.entity';
import { Category } from 'src/Model/Entities/category.entity';
import { Status } from 'src/Model/Entities/status.entity';
import { CatalogController } from '../Controllers/CatalogController';
import { CategoryRepository } from 'src/Repository/Implementation/CategoryRepository';

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