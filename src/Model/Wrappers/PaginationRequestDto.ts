// export class PaginationRequestDto {
//   pageNumber: number;
//   pageSize: number;
  
//     constructor(pageNumber: number, pageSize: number) {
//         this.pageNumber = pageNumber;
//         this.pageSize = pageSize;
//     }
// }

export class PaginationRequestDto {
  pageNumber: number;
  pageSize: number;

  constructor(pageNumber = 1, pageSize = 20) {
    this.pageNumber = pageNumber < 1 ? 1 : pageNumber;
    this.pageSize = pageSize;
  }
}