import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @IsString()
  @IsNotEmpty()
  commonName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
