import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IUpdateUserParams {
  first_name?: string;
  last_name?: string;
  password?: string;
}

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParams): Promise<User>;
}
