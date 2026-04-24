import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<ICreateUserParams>,
  ): Promise<HttpResponse<User>>;
}

export interface ICreateUserParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: ICreateUserParams): Promise<User>;
}
