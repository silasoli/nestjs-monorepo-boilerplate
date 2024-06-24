import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { AuthenticatedGuard } from '../../../../global-modules/auth/guards/authenticated.guard';
import { CreateAdminDto } from '../dto/create-admin-user.dto';
import { UpdateAdminDto } from '../dto/update-admin-user.dto';
import { AdminUser } from '../entities/admin-user.entity';
import { AdminUserService } from '../services/admin-user.service';

@ApiTags('admin-users')
@Controller('admin-users')
@UseGuards(AuthenticatedGuard)
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post()
  public async create(@Body() dto: CreateAdminDto): Promise<AdminUser> {
    return this.adminUserService.create(dto);
  }

  @Get()
  public async findAll(): Promise<AdminUser[]> {
    return this.adminUserService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<AdminUser> {
    return this.adminUserService.findOneById(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateAdminDto,
  ): Promise<AdminUser> {
    return this.adminUserService.update(id, dto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.adminUserService.remove(id);
  }
}
