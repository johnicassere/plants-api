import { Controller, Post, Body } from '@nestjs/common';
import { PlantService } from './plant.service';

@Controller('plant')
export class PlantController {
  constructor(private service: PlantService) {}

  @Post('create')
  createPlant(@Body() data) {
    return this.service.createPlant(data);
  }
}
