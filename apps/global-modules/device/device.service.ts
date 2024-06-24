import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) { }


  public async create(dto: CreateDeviceDto): Promise<Device> {
    const deviceCreated = this.deviceRepository.create(dto);
    return this.deviceRepository.save(deviceCreated);
  }

  public async findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  public async findOneById(id: string): Promise<Device> {
    const device = await this.deviceRepository.findOneBy({ id });

    if (!device) throw new NotFoundException(`ApiCall ID ${id} not found`);

    return device;
  }

  public async update(id: string, dto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOneById(id);

    return this.deviceRepository.save({ ...device, ...dto });
  }
}
