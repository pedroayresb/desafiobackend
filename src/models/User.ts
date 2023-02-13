import { IUser } from './IUser';

export default class User implements IUser {
  public readonly id?: number;
  public cpf: string;

  constructor() {
    this.id = 0;
    this.cpf = '0';
  }
}
