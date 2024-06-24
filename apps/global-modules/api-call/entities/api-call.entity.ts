import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'api_calls' })
export class ApiCall {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column('json', { nullable: true })
  args: object;

  @Column({ default: true })
  running: boolean;

  @Column({ nullable: true })
  duration: string;

  @Column()
  host: string;

  @Column({ default: true })
  ok: boolean;

  @Column('json', { nullable: true })
  result: object;

  @Column('json', { nullable: true })
  error: object;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
