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

  async create(dadosDaPlanta: CreatePlantDto): Promise<Plant> {
    const plantaExiste = await this.database.plant.findUnique({
      where: { nomeCientifico: dadosDaPlanta.nomeCientifico },
    });

    if (plantaExiste) {
      throw new ConflictException('Essa planta já está cadastrada');
    }

    const planta = await this.database.plant.create({ data: dadosDaPlanta });
    return planta;
  }

  async findAll(): Promise<Plant[]> {
    const plantas = await this.database.plant.findMany();
    return plantas;
  }

  async findOne(id: string): Promise<Plant> {
    const plantaExiste = await this.database.plant.findUnique({
      where: { id },
    });

    if (!plantaExiste) {
      throw new NotFoundException(
        'Planta com o ID informado não foi encontrado',
      );
    }

    return plantaExiste;
  }

  async update(id: string, updatePlantDto: UpdatePlantDto): Promise<Plant> {
    const planta = await this.database.plant.update({
      data: updatePlantDto,
      where: { id },
    });
    return planta;
  }

  async remove(id: string): Promise<{ message: string }> {
    const plantaExiste = await this.database.plant.findUnique({
      where: { id },
    });

    if (!plantaExiste) {
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
