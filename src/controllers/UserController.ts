import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/IUser';
import UserService from '../services/UserServices';

export default class UserController {
  private userService: UserService;
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction, userService: UserService) {
    this.userService = userService;
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public async createUser() {
    try {
      const { cpf } = this.req.body;
      const user: IUser = await this.userService.create(cpf);
      return this.res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return this.next(error);
    }
  }
}
