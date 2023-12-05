export enum EnumTypeError {
  Information = 'I',
  Warn = 'W',
  Error = 'E'
}

export interface ResponseDto<T> {
  statusCode: number;
  typeError: EnumTypeError;
  message: string | string[];
  error: boolean;
  result: T;
}
