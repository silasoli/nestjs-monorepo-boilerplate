import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin-user.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
