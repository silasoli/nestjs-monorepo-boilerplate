import { Request } from 'express';
import { IUserSession } from './IUserSession.interface';

export interface IRequestWithUser extends Request {
  user: IUserSession;
}
