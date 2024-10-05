import { Response } from 'express';
import { TResponse } from '../interface/response';

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    status: data?.statusCode,
    success: data?.success,
    message: data?.message,
    data: data?.data,
    paymentSession: data?.paymentSession,
  });
};
