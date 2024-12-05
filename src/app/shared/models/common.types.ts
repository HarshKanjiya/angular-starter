export interface IFilter { }
export interface IExtend {
  name: string,
  value: any
}
export interface ITheme {
  mode: string;
  color: string;
}

export interface IResponse {
  success?: boolean;
  message?: string;
  data?: any;
  totalCount?: number;
}

export interface IError {
  code: number | string;
  message: string;
  details?: string | null;
}
