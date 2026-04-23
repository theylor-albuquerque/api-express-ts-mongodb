import { User } from '../../models/user';

export interface ICreateUserParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<User>;
}
