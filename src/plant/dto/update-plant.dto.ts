import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePlantDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nomePopular: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  linkImagem: string;
}
