import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddUserCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Users/AddUserCommandHandler';
import { User } from "src/Model/Entities/user.entity";
import { UserRepository } from 'src/Repository/Implementation/UserRepository';
import { UserController } from '../Controllers/UserController';
import { GetUserDataQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Users/GetUserDataQueryHandler';
import { ListAllUsersQueryHandler } from 'src/Domain/Feature/Queries/Handlers/Users/ListAllUsersQueryHandler';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        CqrsModule,
    ],
    controllers: [
        UserController
    ],
    providers: [
        AddUserCommandHandler,
        GetUserDataQueryHandler,
        ListAllUsersQueryHandler,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        }
    ],
    exports: ['IUserRepository'],
})
export class UserModule {}