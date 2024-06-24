import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Validations } from '../../../../common/utils/validations.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly adminUserRepository: Repository<User>,
  ) {}

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async transformDto(
    dto: CreateUserDto | UpdateUserDto,
  ): Promise<void> {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 12);
  }

  public async validCreate(dto: CreateUserDto): Promise<void> {
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

  public async create(dto: CreateUserDto): Promise<User> {
    await this.validCreate(dto);
    await this.transformDto(dto);
    const userCreated = this.adminUserRepository.create(dto);
    return this.adminUserRepository.save(userCreated);
  }

  public async findAll(): Promise<User[]> {
    return this.adminUserRepository.find();
  }

  public async findOneById(id: string): Promise<User> {
    const user = await this.adminUserRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User ID ${id} not found`);

    return user;
  }

  public async validUpdate(_id: string, dto: UpdateUserDto): Promise<any> {
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

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.validUpdate(id, dto);
    await this.transformDto(dto);
    const user = await this.findOneById(id);

    return this.adminUserRepository.save({ ...user, ...dto });
  }

  public async remove(id: string): Promise<UpdateResult> {
    await this.findOneById(id);

    return this.adminUserRepository.softDelete({ id });
  }

  public async findByEmail(email: string): Promise<User> {
    return this.adminUserRepository.findOneBy({
      email: email.toLowerCase(),
    });
  }

  public async login(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) return null;

    const validation = await this.verifyPassword(password, user.password);

    if (user && validation) return user;
    return null;
  }
}
