import { BadRequestException } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';

export const Validations = {
  async uniqueFieldValidate(
    repository: Repository<any>,
    dto: object,
  ): Promise<any> {
    const [field] = Object.keys(dto);
    const [value] = Object.values(dto);
    return repository.findOne({
      where: {
        [`${field}`]: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
          value: `%${value}%`,
        }),
      },
    });
  },

  async validateUniqueValue(
    repository: Repository<any>,
    dto: object,
    message: string,
  ): Promise<void> {
    const registred = await this.uniqueFieldValidate(repository, dto);
    if (registred) throw new BadRequestException(message);
  },

  async validateUniqueValueById(
    _id: string,
    repository: Repository<any>,
    dto: object,
    message: string,
  ): Promise<any> {
    const registred = await this.uniqueFieldValidate(repository, dto);
    if (registred && registred._id != _id)
      throw new BadRequestException(message);
  },
};
