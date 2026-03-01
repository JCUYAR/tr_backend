import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Model/Entities/user.entity";
import { UserRepository } from 'src/Repository/Implementation/UserRepository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        CqrsModule,
    ],
    controllers: [
        
    ],
    providers: [
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        }
    ],
    exports: ['IUserRepository'],
})
export class UserModule {}