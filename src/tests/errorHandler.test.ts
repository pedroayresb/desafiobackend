import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middleware/ErrorHandler';

describe('ErrorHandler', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
  });

  it('deve retornar 400 com o erro "ERRInvalidCpf"', () => {
    const error = new Error('ERRInvalidCpf');

    ErrorHandler.handle(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'ERRInvalidCpf' });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('deve retornar 409 com o erro "ERRUserAlreadyExists"', () => {
    const error = new Error('ERRUserAlreadyExists');

    ErrorHandler.handle(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'ERRUserAlreadyExists' });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('deve retornar 404 com o erro "ERRUserDoesNotExists"', () => {
    const error = new Error('ERRUserDoesNotExists');

    ErrorHandler.handle(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'ERRUserDoesNotExists' });
    expect(next).toHaveBeenCalledTimes(1);
  });
});