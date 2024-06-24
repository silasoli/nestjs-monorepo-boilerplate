import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsMobilePhone, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Email inválido.' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ required: true })
  @MinLength(6, { message: 'O nome é muito curto.' })
  name: string;

  @ApiProperty({ required: true })
  @MinLength(6, { message: 'A senha é muito curta' })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(11, { message: 'O CPF é muito curto' })
  documentNumber: string | null;

  @ApiProperty({ required: true })
  @IsMobilePhone('pt-BR')
  phone: string;
}
