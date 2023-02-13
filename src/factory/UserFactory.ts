import UserRepository from '../repository/UserRepository';
import UserService from '../services/UserServices';

export default class UserFactory {
  public static create(): UserService {
    const repository = new UserRepository();
    const service = new UserService(repository);
    return service;
  }
}
