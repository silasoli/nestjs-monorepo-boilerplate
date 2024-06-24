import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { AdminUserType } from '../enums/admin-user-type.enum';

export class CreateAdminDto {
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

  @ApiProperty({ required: true })
  @MinLength(11, { message: 'O CPF é muito curto' })
  documentNumber: string;

  @ApiProperty({ required: true })
  @IsEnum(AdminUserType, { message: 'O tipo enviado não existe.' })
  type: AdminUserType;
}
