export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

export interface NetworkError extends AppError {
  statusCode?: number;
  url?: string;
  method?: string;
}

export interface ValidationError extends AppError {
  field?: string;
  value?: any;
}
