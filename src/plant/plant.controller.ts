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

@Controller('plant')
export class PlantController {
  constructor(private readonly service: PlantService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  create(@Body() data: CreatePlantDto): Promise<Plant> {
    return this.service.create(data);
  }

  @UseGuards(AuthGuard())
  @Get('findMany')
  findMany(): Promise<Plant[]> {
    return this.service.findMany();
  }

  @UseGuards(AuthGuard())
  @Get('findUnique/:id')
  findUnique(@Param('id') id: string): Promise<Plant> {
    return this.service.findUnique(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdatePlantDto,
  ): Promise<Plant> {
    return this.service.update(id, data);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
