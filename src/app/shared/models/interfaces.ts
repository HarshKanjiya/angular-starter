import { IExtend, IFilter } from "./common.types";

export class QueryParameter {
  filters: IFilter[] = [];
  extends: IExtend[] = [];
  pageNum: number;
  pageSize: number;

  constructor(pageNum?: number, pageSize?: number) {
    this.pageNum = pageNum ?? 1;
    this.pageSize = pageSize ?? 10;
  }
}
export class PageObject {

  currentPage: number;
  totalCount: number;
  pageSize: number;

  constructor(currentPage?: number, pageSize?: number, totalCount?: number) {
    this.currentPage = currentPage ?? 1;
    this.pageSize = pageSize ?? 10;
    this.totalCount = totalCount ?? 0;
  }
}
