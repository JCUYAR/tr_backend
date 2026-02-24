import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Model/Entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
})
export class UserModule {}