import UserRepository from '../repository/UserRepository';
import UserValidations from '../validations/userValidations';
import { IUser } from '../models/IUser';

export default class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  public async create(cpf: string): Promise<IUser> {
    if (!UserValidations.isCpfValid(cpf)) throw new Error('ERRInvalidCpf');
    const created = await this.userRepository.create(cpf);
    return created;
  }

  public async delete(cpf: string): Promise<IUser> {
    if (!UserValidations.isCpfValid(cpf)) throw new Error('ERRInvalidCpf');
    const deleted = await this.userRepository.delete(cpf);
    return deleted;
  }

  public async findAll(): Promise<IUser[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  public async findByCpf(cpf: string): Promise<IUser | null> {
    if (!UserValidations.isCpfValid(cpf)) throw new Error('ERRInvalidCpf');
    const user = await this.userRepository.findByCpf(cpf);
    if (!user) throw new Error('ERRUserDoesNotExists');
    return user;
  }
}
