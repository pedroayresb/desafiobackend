import PrismaConnection from "../utils/PrismaConnection";
import { PrismaClient } from "@prisma/client";
import UserRepository from "../repository/UserRepository";
import { IUser } from "../models/IUser";

describe("UserRepository", () => {
  let repository: UserRepository;
  let prisma: PrismaClient;
  let connection: PrismaConnection;

  beforeAll(async () => {
    connection = {
      connect: jest.fn().mockReturnValue({
        user: {
          findUnique: jest.fn().mockReturnValue({ cpf: "67727004065" }),
          create: jest.fn().mockReturnValue({ cpf: "67727004065" }),
          delete: jest.fn().mockReturnValue({ cpf: "67727004065" }),
          findMany: jest.fn().mockReturnValue([{ cpf: "67727004065" }]),
        },
        $disconnect: jest.fn(),
      } as unknown as PrismaClient),
    } as unknown as PrismaConnection;

    repository = new UserRepository(connection);
  });
  
  describe("findByCpf", () => {
    it('deve retornar um usuario se cpf valido', async () => {
      const user = await repository.findByCpf('67727004065');
      expect(user).toEqual({ cpf: '67727004065' });
    });
  });

  describe("create", () => {
    it('deve criar um usuario se cpf valido', async () => {
      connection.connect().user.findUnique = jest.fn().mockReturnValue(null);
      const user = await repository.create('67727004065');
      expect(user).toEqual({ cpf: '67727004065' });
    });

    it('deve falhar se cpf ja existir', async () => {
      connection.connect().user.findUnique = jest.fn().mockReturnValue({ cpf: '67727004065' });
      await expect(repository.create('67727004065')).rejects.toThrow('ERRUserAlreadyExists');
    });
  });

  describe("delete", () => {
    it('deve deletar usuario se cpf valido', async () => {
      const user = await repository.delete('67727004065');
      expect(user).toEqual({ cpf: '67727004065' });
    });

    it('deve falhar se cpf nao existir', async () => {
      connection.connect().user.findUnique = jest.fn().mockReturnValue(null);
      await expect(repository.delete('67727004065')).rejects.toThrow('ERRUserDoesNotExists');
    });
  });

  describe("findAll", () => {
    it('deve retornar todos os usuarios', async () => {
      const users = await repository.findAll();
      expect(users).toEqual([{ cpf: '67727004065' }]);
    });
  });
});