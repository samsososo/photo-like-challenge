export interface AppError {
  code?: ErrorCode;
  message?: string;
  meta?: any;
}

export interface ParamError {
  param: string;
  errorCode: string;
}

export enum ErrorCode {
  UNEXPECTED_ERROR = 'unexpected_error',
}
