import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse, TErrorSources } from '../interface/error';

const handleZodError = (error: ZodError): TErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = error?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue.path.reverse()[0],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default handleZodError;
