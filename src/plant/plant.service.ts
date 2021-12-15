import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PrismaService } from 'src/prisma.service';
import { Plant } from '@prisma/client';

@Injectable()
export class PlantService {
  constructor(private database: PrismaService) {}

  async create(data: CreatePlantDto): Promise<Plant> {
    const plantExists = await this.database.plant.findUnique({
      where: { scientificName: data.scientificName },
    });

    if (plantExists) {
      throw new ConflictException('Essa planta já está cadastrada');
    }

    const plant = await this.database.plant.create({ data: data });
    return plant;
  }

  async findMany(): Promise<Plant[]> {
    const plants = await this.database.plant.findMany();
    return plants;
  }

  async findUnique(id: string): Promise<Plant> {
    const plantExists = await this.database.plant.findUnique({
      where: { id },
    });

    if (!plantExists) {
      throw new NotFoundException(
        'Planta com o ID informado não foi encontrado',
      );
    }

    return plantExists;
  }

  async update(id: string, data: UpdatePlantDto): Promise<Plant> {
    const plant = await this.database.plant.update({
      data: data,
      where: { id },
    });
    return plant;
  }

  async delete(id: string): Promise<{ message: string }> {
    const plantExists = await this.database.plant.findUnique({
      where: { id },
    });

    if (!plantExists) {
      throw new NotFoundException(
        'Planta com o ID informado não foi encontrado',
      );
    } else {
      await this.database.plant.delete({
        where: { id },
      });
    }

    return { message: 'Id foi encontrado e deletado ' };
  }
}
