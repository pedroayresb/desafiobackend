import UserRepository from '../repository/UserRepository';
import UserService from '../services/UserServices';
import PrismaConnection from '../utils/PrismaConnection';

export default class UserFactory {
  public static create(): UserService {
    const persistence = new PrismaConnection();
    const repository = new UserRepository(persistence);
    const service = new UserService(repository);
    return service;
  }
}
