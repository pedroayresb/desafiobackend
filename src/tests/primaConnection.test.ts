import PrismaConnection from '../utils/PrismaConnection';
import { PrismaClient } from '@prisma/client';

describe('PrismaConnection', () => {
  let connection: PrismaClient;

  beforeAll(() => {
    connection = new PrismaConnection().connect();
  });

  it('should connect to the database', async () => {
    expect(connection).toBeInstanceOf(PrismaClient);
  });
});