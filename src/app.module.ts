import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PlantModule } from './plant/plant.module';

@Module({
  imports: [UserModule, PlantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
