import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginCommandHandler } from 'src/Domain/Feature/Commands/Handlers/Login/LoginCommandHandler';
import { AuthController } from '../Controllers/AuthController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Model/Entities/user.entity';
import { UserRepository } from 'src/Repository/Implementation/UserRepository';
import { Role } from 'src/Model/Entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Role
        ]),
        CqrsModule,
        JwtModule.register({
            secret: 'SUPER_SECRET_KEY',
            signOptions: { expiresIn: '8h' }
        })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        LoginCommandHandler,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        }
    ],
    exports: ['IUserRepository'],
})
export class AuthModule { }