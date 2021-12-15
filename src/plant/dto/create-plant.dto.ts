import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  scientificName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  commonName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;
}
