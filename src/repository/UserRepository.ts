import PrismaConnection from '../utils/PrismaConnection';
import { IUser } from '../models/IUser';

export default class UserRepository {
  private persistence: PrismaConnection;

  constructor() {
    this.persistence = new PrismaConnection();
  }

  public async findByCpf(cpf: string): Promise<IUser | null> {
    const prisma = this.persistence.connect();
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
    });
    prisma.$disconnect();
    return user;
  }

  public async create(cpf: string): Promise<IUser> {
    const exists = await this.findByCpf(cpf);
    if (exists) throw new Error('ERRUserAlreadyExists');
    const prisma = this.persistence.connect();
    const newUser = await prisma.user.create({
      data: {
        cpf,
      },
    });
    prisma.$disconnect();
    return newUser;
  }
}
