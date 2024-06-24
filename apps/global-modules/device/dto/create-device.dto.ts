import { DeviceType, IPlatform, IScreen } from '../entities/device.entity';

export class CreateDeviceDto {
  id: string;

  date: Date;

  type: DeviceType;

  platform: IPlatform | null;

  screen: IScreen | null;

  ip: string;

  version: string | null;

  language: string | null;

  lastActiveAt?: Date;

  fingerprint: string;

  push?: string;

  clientId: string | null;

  adminUserId: string | null;
}
