import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiCallService } from './api-call.service';
import { ApiCall } from './entities/api-call.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiCall])],
  providers: [ApiCallService],
  exports: [ApiCallService],
})
export class ApiCallModule {}
