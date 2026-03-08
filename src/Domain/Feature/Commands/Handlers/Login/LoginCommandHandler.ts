import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../../Requests/Login/LoginCommand";
import { JwtService } from "@nestjs/jwt";
import { Inject } from "@nestjs/common";
import type { IUserRepository } from "src/Repository/Interface/IUserRepository";
import { BaseResult } from "src/Model/Wrappers/BaseResult";
import { AppError } from "src/Model/Wrappers/Error";
import { ErrorCode } from "src/Model/Wrappers/ErrorCode";
import * as bcrypt from 'bcrypt';
import { LoginResponse } from "src/Model/DTOs/Responses/Login/LoginResponse";

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,

        private jwtService: JwtService
    ) {}

    async execute(command: LoginCommand) {
        const user = await this.userRepository.existsByUsername(
            command.username
        );

        if (!user) {
            return BaseResult.fail(new AppError(ErrorCode.NotFound, "User doesn't exists", "user"));
        }

        const passwordValid = await bcrypt.compare(
            command.password,
            user.password
        )

        if (!passwordValid) {
            return BaseResult.fail(new AppError(ErrorCode.AccessDenied, "Incorrect password", "user"));
        }

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role
        }

        const token = this.jwtService.sign(payload);
        
        return BaseResult.ok<LoginResponse>([
            { access_token: token }
        ]);
    }
}