import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApiCallDto } from './dto/create-api-call.dto';
import { UpdateApiCallDto } from './dto/update-api-call.dto';
import { ApiCall } from './entities/api-call.entity';

@Injectable()
export class ApiCallService {
  constructor(
    @InjectRepository(ApiCall)
    private readonly apiCallRepository: Repository<ApiCall>,
  ) {}

  public async create(dto: CreateApiCallDto): Promise<ApiCall> {
    const apiCallCreated = this.apiCallRepository.create(dto);
    return this.apiCallRepository.save(apiCallCreated);
  }

  public async findAll(): Promise<ApiCall[]> {
    return this.apiCallRepository.find();
  }

  public async findOneById(id: string): Promise<ApiCall> {
    const apiCall = await this.apiCallRepository.findOneBy({ id });

    if (!apiCall) throw new NotFoundException(`ApiCall ID ${id} not found`);

    return apiCall;
  }

  public async update(id: string, dto: UpdateApiCallDto): Promise<ApiCall> {
    const apiCall = await this.findOneById(id);

    return this.apiCallRepository.save({ ...apiCall, ...dto });
  }
}
