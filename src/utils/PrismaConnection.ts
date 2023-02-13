/* eslint-disable class-methods-use-this */
import { PrismaClient } from '@prisma/client';
import AstractConnection from './AbstractConnection';

export default class PrismaConnection extends AstractConnection<PrismaClient> {
  public connect(): PrismaClient {
    return new PrismaClient();
  }
}
