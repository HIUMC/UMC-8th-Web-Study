export type commonResponse<T> = {
  status:boolean;
  statusCode: number;
  message: string;
  data: T;
}