import { Response } from 'express';

export interface ErrorResponse {
  code: string;
  message: string;
  error?: any;
}

export const handleError = (res: Response, statusCode: number, code: string, message: string, error?: any): void => {
  res.status(statusCode).json({
    code,
    message,
    error,
  });
};
