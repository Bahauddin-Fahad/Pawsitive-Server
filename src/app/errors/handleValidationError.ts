import mongoose from 'mongoose';
import { TErrorResponse, TErrorSources } from '../interface/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TErrorResponse => {
  const statusCode = 400;
  const errorValues = Object.values(error?.errors);
  const errorSources: TErrorSources = errorValues.map(
    (errValue: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: errValue.path,
        message: errValue.message,
      };
    },
  );
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};
export default handleValidationError;
