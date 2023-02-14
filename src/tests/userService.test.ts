import UserService from '../services/UserServices';
import UserRepository from '../repository/UserRepository';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn().mockReturnValue({ cpf: '67727004065' }),
      delete: jest.fn().mockReturnValue({ cpf: '67727004065' }),
      findAll: jest.fn().mockReturnValue([{ cpf: '67727004065' }]),
      findByCpf: jest.fn().mockReturnValue({ cpf: '67727004065' }),
    } as unknown as UserRepository;

    service = new UserService(repository);
  });

  describe('create', () => {
    it('deve criar um usuario se cpf valido', async () => {
      const user = await service.create('67727004065');
      expect(user).toEqual({ cpf: '67727004065' });
      expect(repository.create).toHaveBeenCalledWith('67727004065');
    });

    it('deve falhar com cpf invalido', async () => {
      await expect(service.create('6772700406')).rejects.toThrow('ERRInvalidCpf');
    });
  });

  describe('delete', () => {
    it('deve deletar usuario se cpf valido', async () => {
      const user = await service.delete('67727004065');
      expect(user).toEqual({ cpf: '67727004065' });
      expect(repository.delete).toHaveBeenCalledWith('67727004065');
    });

    it('deve falhar com cpf invalido', async () => {
      await expect(service.delete('6772700406')).rejects.toThrow('ERRInvalidCpf');
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuarios', async () => {
      const users = await service.findAll();
      expect(users).toEqual([{ cpf: '67727004065' }]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findByCpf', () => {
    it('deve retornar um usuario se cpf valido', async () => {
      const user = await service.findByCpf('67727004065');
      expect(user).toEqual({ cpf: '67727004065' });
      expect(repository.findByCpf).toHaveBeenCalledWith('67727004065');
    });

    it('deve falhar se cpf invalido', async () => {
      await expect(service.findByCpf('6772700406')).rejects.toThrow('ERRInvalidCpf');
    });

    it('deve falhar se cpf nao existir', async () => {
      repository.findByCpf = jest.fn().mockReturnValue(null);
      await expect(service.findByCpf('67727004065')).rejects.toThrow('ERRUserDoesNotExists');
    });
  });
});