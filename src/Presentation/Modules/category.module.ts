import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from 'src/Model/Entities/area.entity';
import { Category } from 'src/Model/Entities/category.entity';
import { Status } from 'src/Model/Entities/status.entity';
import { CatalogController } from '../Controllers/CatalogController';
import { CategoryRepository } from 'src/Repository/Implementation/CategoryRepository';
import { CategoryController } from '../Controllers/CategoryController';
import { AddCategoryCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Category/AddCategoryCommandHandler';

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
    CategoryController
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
export class CategoryModule {}