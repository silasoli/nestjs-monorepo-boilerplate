import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { UsersAuthController } from './controllers/users-auth.controller';
import { UserLocalStrategy } from '../../../global-modules/auth/strategy/user-local.strategy';
import { SessionSerializer } from '../../../global-modules/auth/serializers/session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  controllers: [UsersController, UsersAuthController],
  providers: [UsersService, UserLocalStrategy, SessionSerializer],
})
export class UsersModule {}
