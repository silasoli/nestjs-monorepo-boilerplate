import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsEmail({}, { message: 'Email inválido.' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({ required: true })
  @MinLength(6, { message: 'A senha é muito curta' })
  password: string;
}
