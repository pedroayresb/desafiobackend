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
      return this.next(error);
    }
  }

  public async deleteUser() {
    try {
      const { cpf } = this.req.params;
      const user: IUser = await this.userService.delete(cpf);
      return this.res.status(200).json(user);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findUser() {
    try {
      const { cpf } = this.req.params;
      const user: IUser | null = await this.userService.findByCpf(cpf);
      if (!user) return this.res.status(404).json({ message: 'User not found' });
      return this.res.status(200).json(user);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findAllUsers() {
    try {
      const users: IUser[] = await this.userService.findAll();
      return this.res.status(200).json(users);
    } catch (error) {
      return this.next(error);
    }
  }
}
