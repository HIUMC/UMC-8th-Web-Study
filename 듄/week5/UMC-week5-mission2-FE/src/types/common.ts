export type CommonResponseDto<T> = {
  status: boolean,
  statusCode: number,
  message: string,
  data: T
}

