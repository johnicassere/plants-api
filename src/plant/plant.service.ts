import { Injectable } from '@nestjs/common';

@Injectable()
export class PlantService {
  banco = [];

  createPlant(data) {
    this.banco.push(data);
    return this.banco;
  }
}
