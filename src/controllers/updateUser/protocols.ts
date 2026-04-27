import { User } from '../../models/user';

export interface IUpdateUserParams {
  first_name?: string;
  last_name?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<User>;
}
