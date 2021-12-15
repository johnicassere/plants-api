import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlantDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  commonName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;
}
