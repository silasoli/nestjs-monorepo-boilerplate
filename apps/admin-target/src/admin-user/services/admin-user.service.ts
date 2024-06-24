import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateAdminDto } from '../dto/create-admin-user.dto';
import { UpdateAdminDto } from '../dto/update-admin-user.dto';
import { AdminUser } from '../entities/admin-user.entity';
import * as bcrypt from 'bcrypt';
import { Validations } from '../../../../common/utils/validations.util';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async transformDto(
    dto: CreateAdminDto | UpdateAdminDto,
  ): Promise<void> {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 12);
  }

  public async validCreate(dto: CreateAdminDto): Promise<void> {
    const { email, documentNumber } = dto;

    if (email)
      await Validations.validateUniqueValue(
        this.adminUserRepository,
        { email },
        'Já existe uma Conta com esse Email',
      );

    if (documentNumber)
      await Validations.validateUniqueValue(
        this.adminUserRepository,
        { documentNumber },
        'Já existe uma Conta com esse CPF ou CNPJ.',
      );
  }

  public async create(dto: CreateAdminDto): Promise<AdminUser> {
    await this.validCreate(dto);
    await this.transformDto(dto);
    const adminUserCreated = this.adminUserRepository.create(dto);
    return this.adminUserRepository.save(adminUserCreated);
  }

  public async findAll(): Promise<AdminUser[]> {
    return this.adminUserRepository.find();
  }

  public async findOneById(id: string): Promise<AdminUser> {
    const adminUser = await this.adminUserRepository.findOneBy({ id });

    if (!adminUser) throw new NotFoundException(`AdminUser ID ${id} not found`);

    return adminUser;
  }

  public async validUpdate(_id: string, dto: UpdateAdminDto): Promise<any> {
    const { email, documentNumber } = dto;

    if (email)
      await Validations.validateUniqueValueById(
        _id,
        this.adminUserRepository,
        { email },
        'Já existe uma Conta com esse Email',
      );

    if (documentNumber)
      await Validations.validateUniqueValueById(
        _id,
        this.adminUserRepository,
        { documentNumber },
        'Já existe uma Conta com esse Email',
      );
  }

  public async update(id: string, dto: UpdateAdminDto): Promise<AdminUser> {
    await this.validUpdate(id, dto);
    await this.transformDto(dto);
    const adminUser = await this.findOneById(id);

    return this.adminUserRepository.save({ ...adminUser, ...dto });
    // return this.adminUserRepository.update(id, dto);
  }

  public async remove(id: string): Promise<UpdateResult> {
    await this.findOneById(id);

    return this.adminUserRepository.softDelete({ id });
  }

  public async findByEmail(email: string): Promise<AdminUser> {
    return this.adminUserRepository.findOneBy({
      email: email.toLowerCase(),
    });
  }

  public async login(email: string, password: string): Promise<AdminUser> {
    const adminUser = await this.findByEmail(email);

    if (!adminUser) return null;

    const validation = await this.verifyPassword(password, adminUser.password);

    if (adminUser && validation) return adminUser;
    return null;
  }
}
