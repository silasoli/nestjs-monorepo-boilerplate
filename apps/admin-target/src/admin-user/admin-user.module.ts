import { Module } from '@nestjs/common';
import { AdminUserController } from './controllers/admin-user.controller';
import { AdminUserAuthController } from './controllers/admin-user-auth.controller';
import { AdminUserService } from './services/admin-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '../../../global-modules/auth/serializers/session.serializer';
import { AdminUserLocalStrategy } from '../../../global-modules/auth/strategy/admin-user-local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    PassportModule.register({ session: true }),
  ],
  controllers: [AdminUserController, AdminUserAuthController],
  providers: [AdminUserService, AdminUserLocalStrategy, SessionSerializer],
  exports: [AdminUserService],
})
export class AdminUserModule {}
