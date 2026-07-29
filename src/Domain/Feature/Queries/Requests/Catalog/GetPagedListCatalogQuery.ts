import { PaginationRequestDto } from "src/Model/Wrappers/PaginationRequestDto";


export class GetPagedListCatalogQuery extends PaginationRequestDto {
  constructor(
    pageNumber: number,
    pageSize: number,
    public readonly type?: string,
    public readonly description?: string,
  ) {
    super();

    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}