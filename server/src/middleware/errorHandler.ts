import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/response.js';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Application Error:', err);

  if (err instanceof ZodError) {
    const issues = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return sendError(res, 'Validation error occurred', 422, issues, 'VALIDATION_FAILED');
  }

  if (err.name === 'MulterError') {
    return sendError(res, `File upload error: ${err.message}`, 400, null, 'UPLOAD_ERROR');
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return sendError(res, message, statusCode, null, 'SERVER_ERROR');
};
