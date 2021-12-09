import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  nomeCientifico: string;

  @IsString()
  @IsNotEmpty()
  nomePopular: string;

  @IsString()
  @IsNotEmpty()
  reino: string;

  @IsString()
  @IsNotEmpty()
  divisao: string;

  @IsString()
  @IsNotEmpty()
  classe: string;

  @IsString()
  @IsNotEmpty()
  ordem: string;

  @IsString()
  @IsNotEmpty()
  familia: string;

  @IsString()
  @IsNotEmpty()
  subfamilia: string;

  @IsString()
  @IsNotEmpty()
  linkImagem: string;
}
