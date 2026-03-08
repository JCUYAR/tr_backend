import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddUserCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Users/AddUserCommandHandler';
import { User } from "src/Model/Entities/user.entity";
import { UserRepository } from 'src/Repository/Implementation/UserRepository';
import { UserController } from '../Controllers/UserController';

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
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        }
    ],
    exports: ['IUserRepository'],
})
export class UserModule {}