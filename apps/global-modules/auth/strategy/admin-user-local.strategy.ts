import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminUserService } from '../../../admin-target/src/admin-user/services/admin-user.service';
import { IUserSession } from '../../../common/interfaces/IUserSession.interface';

@Injectable()
export class AdminUserLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminUserService: AdminUserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<IUserSession> {
    const adminUser = await this.adminUserService.login(email, password);

    if (!adminUser) new UnauthorizedException('login errado');

    return { id: adminUser.id, email: adminUser.email, type: adminUser.type };
  }
}
