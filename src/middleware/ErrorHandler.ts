import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error.message === 'ERRInvalidCpf') {
      return res.status(400).json({ error: error.message });
    }
    if (error.message === 'ERRUserAlreadyExists') {
      return res.status(409).json({ error: error.message });
    }

    next();
  }
}

export default ErrorHandler;
