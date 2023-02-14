import UserFactory from '../factory/UserFactory';
import UserService from '../services/UserServices';

jest.mock('../utils/PrismaConnection');

describe('UserFactory', () => {
  test('deve criar uma instance de service', () => {
    const service = UserFactory.create();

    expect(service).toBeInstanceOf(UserService);
  });
});