import { BaseResult } from "./BaseResult";
import { PaginationRequestDto } from "./PaginationRequestDto";
import { PaginationResponseDto } from "./PaginationResponseDto";

export class PagedResponse<T> extends BaseResult<T[]> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;

  constructor(
    model: PaginationResponseDto<T>,
    request: PaginationRequestDto,
  ) {
    super(true, model.data);

    this.pageNumber = request.pageNumber;
    this.pageSize = request.pageSize;
    this.totalItems = model.count;
    this.totalPages = Math.ceil(model.count / request.pageSize);

    this.data = model.data;
    this.success = true;
  }

  get hasPreviousPage(): boolean {
    return this.pageNumber > 1;
  }

  get hasNextPage(): boolean {
    return this.pageNumber < this.totalPages;
  }
}