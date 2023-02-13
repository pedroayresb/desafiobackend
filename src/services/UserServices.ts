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
}
