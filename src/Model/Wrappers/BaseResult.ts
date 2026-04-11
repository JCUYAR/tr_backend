import { AppError } from './Error';

export class BaseResult<T = any> {
  success: boolean;
  data: T;
  errors: AppError[];

  private constructor(
    success: boolean,
    data: T,
    errors: AppError[] = []
  ) {
    this.success = success;
    this.data = data;
    this.errors = errors;
  }

  static ok<T>(data: T): BaseResult<T> {
    return new BaseResult<T>(true, data);
  }

  static fail<T>(errors: AppError | AppError[]): BaseResult<T> {
    return new BaseResult<T>(
      false,
      null as T,
      Array.isArray(errors) ? errors : [errors],
    );
  }
}