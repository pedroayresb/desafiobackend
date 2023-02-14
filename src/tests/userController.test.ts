import UserController from '../controllers/UserController';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserServices';
import UserValidations from '../validations/userValidations';
import UserRepository from '../repository/UserRepository';

describe('UserController', () => {
  let controller: UserController;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let userService: UserService;
  let userValidations: UserValidations;
  let userRepository: UserRepository;

  beforeEach(() => {
    req = {
      body: {
        cpf: '67727004065',
      },
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    next = jest.fn();

    userService = {
      create: jest.fn().mockReturnValue({ cpf: '67727004065' }),
      delete: jest.fn().mockReturnValue({ cpf: '67727004065' }),
      findAll: jest.fn().mockReturnValue([{ cpf: '67727004065' }]),
      findByCpf: jest.fn().mockReturnValue({ cpf: '67727004065' }),
    } as unknown as UserService;

    userValidations = {
      isCpfValid: jest.fn().mockReturnValue(true),
    } as unknown as UserValidations;

    userRepository = {
      findByCpf: jest.fn().mockReturnValue({ cpf: '67727004065' }),
      findAll: jest.fn().mockReturnValue([{ cpf: '67727004065' }]),
      create: jest.fn().mockReturnValue({ cpf: '67727004065' }),
      delete: jest.fn().mockReturnValue({ cpf: '67727004065' }),
    } as unknown as UserRepository;

    controller = new UserController(req, res, next, userService);
  });

  describe('createUser', () => {
    it('deve criar o cpf e retornar com 201', async () => {
      await controller.createUser();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ cpf: '67727004065' });
    });

    it('deve encaminhar ao ErrorHandler se cpf invalido', async () => {
      UserValidations.isCpfValid = jest.fn().mockReturnValue(false);
      userService.create = jest.fn().mockImplementation(() => {
        throw new Error('ERRInvalidCpf');
      });
      await controller.createUser();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('findUser', () => {
    it('deve encontrar o cpf e retornar com 200', async () => {
      const newReq = {
        params: {
          cpf: '67727004065',
        }
      } as unknown as Request;
      controller = new UserController(newReq, res, next, userService);
      await controller.findUser();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ cpf: '67727004065' });
    });

    it('deve encaminhar ao ErrorHandler se cpf invalido', async () => {
      const newReq = {
        params: {
          cpf: '67727004065',
        }
      } as unknown as Request;
      controller = new UserController(newReq, res, next, userService);
      userService.findByCpf = jest.fn().mockImplementation(() => {
        throw new Error('ERRInvalidCpf');
      });
      await controller.findUser();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('deve deletar o cpf e retornar com 200', async () => {
      const newReq = {
        params: {
          cpf: '67727004065',
        }
      } as unknown as Request;
      controller = new UserController(newReq, res, next, userService);
      await controller.deleteUser();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('deve encaminhar ao ErrorHandler se cpf invalido', async () => {
      const newReq = {
        params: {
          cpf: '67727004065',
        }
      } as unknown as Request;
      controller = new UserController(newReq, res, next, userService);
      userService.delete = jest.fn().mockImplementation(() => {
        throw new Error('ERRInvalidCpf');
      });
      await controller.deleteUser();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('findAllUsers', () => {
    it('deve retornar todos os cpf e retornar com 200', async () => {
      await controller.findAllUsers();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ cpf: '67727004065' }]);
    });

    it('deve encaminhar ao ErrorHandler se cpf invalido', async () => {
      userService.findAll = jest.fn().mockImplementation(() => {
        throw new Error('ERRInvalidCpf');
      });
      await controller.findAllUsers();
      expect(next).toHaveBeenCalled();
    });
  });
});