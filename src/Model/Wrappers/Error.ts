import { ErrorCode } from './ErrorCode';

export class AppError {
  constructor(
    public errorCode: ErrorCode,
    public description?: string,
    public fieldName?: string,
  ) {}
}