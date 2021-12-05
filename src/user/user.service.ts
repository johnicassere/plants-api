import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async createUser(data: CreateUserDto) {
    delete data.confirmacaoSenha;
    await this.db.user.create({ data });
  }
}
