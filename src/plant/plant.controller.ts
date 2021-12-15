import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('plant')
@Controller('plant')
export class PlantController {
  constructor(private readonly service: PlantService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  @ApiOperation({
    summary: 'Criar uma planta',
  })
  @ApiBearerAuth()
  create(@Body() data: CreatePlantDto): Promise<Plant> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Post('createMany')
  @ApiOperation({
    summary: 'Criar várias plantas',
  })
  @ApiBearerAuth()
  createMany(@Body() data: CreatePlantDto[]): Promise<Plant[]> {
    return this.service.createMany(data);
  }

  @Get('findMany')
  @ApiOperation({
    summary: 'Listar todas as plantas cadastradas',
  })
  findMany(): Promise<Plant[]> {
    return this.service.findMany();
  }

  @Get('findUnique/:id')
  @ApiOperation({
    summary: 'Encontrar uma planta pelo ID',
  })
  findUnique(@Param('id') id: string): Promise<Plant> {
    return this.service.findUnique(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  @ApiOperation({
    summary: 'Atualizar uma planta pelo ID',
  })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() data: UpdatePlantDto,
  ): Promise<Plant> {
    return this.service.update(id, data);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Deletar uma planta pelo ID',
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
  }

  @UseGuards(AuthGuard())
  @Delete('deleteMany')
  @ApiOperation({
    summary: 'Deletar todos os dados do banco',
  })
  @ApiBearerAuth()
  deleteMany(): Promise<{ count: number }> {
    return this.service.deleteMany();
  }
}
