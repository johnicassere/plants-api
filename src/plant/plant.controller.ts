import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from '@prisma/client';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post('create')
  create(@Body() createPlantDto: CreatePlantDto): Promise<Plant> {
    return this.plantService.create(createPlantDto);
  }

  @Get('get-all')
  findAll(): Promise<Plant[]> {
    return this.plantService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Plant> {
    return this.plantService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updatePlantDto: UpdatePlantDto,
  ): Promise<Plant> {
    return this.plantService.update(id, updatePlantDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.plantService.remove(id);
  }
}
