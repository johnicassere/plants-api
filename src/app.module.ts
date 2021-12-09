import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PlantModule } from './plant/plant.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PlantModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
