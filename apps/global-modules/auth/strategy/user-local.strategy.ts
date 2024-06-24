import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUserSession } from '../../../common/interfaces/IUserSession.interface';
import { UsersService } from '../../../user-target/src/users/services/users.service';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<IUserSession> {
    const user = await this.usersService.login(email, password);

    if (!user) new UnauthorizedException('login errado');

    return { id: user.id, email: user.email };
  }
}
