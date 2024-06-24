import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserSession } from '../../../common/interfaces/IUserSession.interface';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: IUserSession,
    done: (err: Error, user: IUserSession) => void,
  ): void {
    done(null, user);
  }

  deserializeUser(
    payload: IUserSession,
    done: (err: Error, payload: IUserSession) => void,
  ): void {
    done(null, payload);
  }
}
