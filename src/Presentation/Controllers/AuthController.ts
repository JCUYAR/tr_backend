import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from 'src/Domain/Feature/Commands/Requests/Login/LoginCommand';
import { LoginRequestDto } from 'src/Model/DTOs/BodySchema/Login/LoginRequestDto';

@Controller('auth')
export class AuthController {

  constructor(private commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() dto: LoginRequestDto) {

    return await this.commandBus.execute(
      new LoginCommand(dto.username, dto.password)
    );

  }

}