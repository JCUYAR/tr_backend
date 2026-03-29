import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  HttpStatus
} from '@nestjs/common';

import { Response } from 'express';
import { BaseResult } from 'src/Model/Wrappers/BaseResult';
import { AppError } from 'src/Model/Wrappers/Error';
import { ErrorCode } from 'src/Model/Wrappers/ErrorCode';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {

  catch(exception: UnauthorizedException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const result = BaseResult.fail(
      new AppError(
        ErrorCode.AccessDenied,
        'Not authorized access for this resource'
      )
    );

    response
      .status(HttpStatus.UNAUTHORIZED)
      .json(result);

  }

}