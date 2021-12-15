import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    if (data.password !== data.passwordConfirmation) {
      throw new UnauthorizedException(
        'A senha e a confirmação da senha não são compativeis',
      );
    }

    const userExists = await this.database.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('E-mail já está cadastrado');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    delete data.passwordConfirmation;

    const user = await this.database.user.create({
      data: {
        ...data,
        password: passwordHash,
      },
    });

    delete user.password;
    return user;
  }

  async findMany(): Promise<any[]> {
    const users = await this.database.user.findMany();
    const usersList = users.map(({ password, ...rest }) => rest);
    return usersList;
  }

  async findUnique(id: string): Promise<User> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário com o ID informado não foi encontrado',
      );
    }

    delete user.password;
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.database.user.update({
      data: data,
      where: { id: id },
    });

    delete user.password;

    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário com o ID informado não foi encontrado',
      );
    } else {
      await this.database.user.delete({
        where: { id },
      });
    }

    return {
      message: 'Id foi encontrado e deletado com sucesso',
    };
  }

  async addList(user: User, plantId: string): Promise<{ message: string }> {
    const plant = await this.database.plant.findUnique({
      where: { id: plantId },
    });

    if (!plant) {
      throw new NotFoundException('Planta não encontrada');
    }

    const userPlants = await this.database.user.findUnique({
      where: { id: user.id },
      include: {
        plants: true,
      },
    });

    const userPlantsArray = userPlants.plants;
    let foundPlant = false;

    userPlantsArray.map((plant) => {
      if (plant.id === plantId) {
        foundPlant = true;
      }
    });

    if (foundPlant) {
      await this.database.user.update({
        where: { id: user.id },
        data: {
          plants: {
            disconnect: {
              id: plant.id,
            },
          },
        },
        include: {
          plants: true,
        },
      });

      return { message: 'Planta removida da lista' };
    } else {
      await this.database.user.update({
        where: { id: user.id },
        data: {
          plants: {
            connect: {
              id: plant.id,
            },
          },
        },
        include: {
          plants: true,
        },
      });

      return { message: 'Planta adicionada na lista' };
    }
  }
}
