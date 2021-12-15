import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 150)
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 150)
  email: string;

  @IsOptional()
  @IsNotEmpty()
  imageUrl: string;
}
