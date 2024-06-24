import { AdminUserType } from '../../admin-target/src/admin-user/enums/admin-user-type.enum';

export interface IUserSession {
  id: string;
  email: string;
  type?: AdminUserType;
}
