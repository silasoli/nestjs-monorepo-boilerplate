import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
  SST = 'SSR',
  NODE = 'NODE',
}

export interface IPlatform {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
}

export interface IScreen {
  width: number;
  height: number;
}

@Entity({ name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  public date: Date;

  @Column({
    type: 'enum',
    enum: DeviceType,
  })
  public type: DeviceType;

  @Column('simple-json', { default: null })
  public platform: IPlatform | null;

  @Column('simple-json', { nullable: true })
  public screen: IScreen | null;

  @Column()
  public ip: string;

  @Column({ nullable: true })
  public version: string | null;

  @Column({ nullable: true })
  public language: string | null;

  @Column({ nullable: true, default: null })
  public lastActiveAt?: Date;

  @Column({ nullable: true })
  public fingerprint: string;

  @Column({ default: null })
  public push?: string;

  @Column({ default: null })
  public clientId: string | null;

  @Column({ default: null })
  public adminUserId: string | null;
}
