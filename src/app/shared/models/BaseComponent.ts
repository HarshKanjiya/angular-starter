import { IExtend, IFilter } from "./common.types";
import { PageObject, QueryParameter } from "./interfaces";

export class BaseComponent {
  isAddEdit = false;
  isLoading = false;
  pageObject = new PageObject();
  queryParameter: QueryParameter = new QueryParameter();

  getData() { }

  reset() {
    this.isAddEdit = false;
    this.pageObject.currentPage = 1;
    this.pageObject.pageSize = 10;
  }

  addFilter(data: IFilter): void {
    this.queryParameter.filters.push(data);
  }

  addExtend(data: IExtend): void {
    this.queryParameter.extends.push(data);
  }

  getFilters(): IFilter[] {
    return this.queryParameter.filters ?? [];
  }

  getExtends(): IExtend[] {
    return this.queryParameter.extends ?? [];
  }

  getParameters(): QueryParameter {
    return this.queryParameter ?? new QueryParameter();
  }

}
