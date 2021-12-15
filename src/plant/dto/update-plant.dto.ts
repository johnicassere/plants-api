import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePlantDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  commonName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
