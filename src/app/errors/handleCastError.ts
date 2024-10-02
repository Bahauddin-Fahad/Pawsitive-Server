import mongoose from 'mongoose';
import { TErrorResponse, TErrorSources } from '../interface/error';

const handleCastError = (error: mongoose.Error.CastError): TErrorResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: 'Error: Invalid Id',
    errorSources,
  };
};
export default handleCastError;
