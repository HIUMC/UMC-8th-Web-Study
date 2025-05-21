export type CommonResponse<T> = {
  name(name: any): unknown;
  status: boolean,
  statusCode: number,
  message: string,
  data: T,
};


