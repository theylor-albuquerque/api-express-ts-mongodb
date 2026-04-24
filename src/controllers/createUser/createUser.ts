import validator from 'validator';
import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  ICreateUserController,
  ICreateUserParams,
  ICreateUserRepository,
} from './protocols';

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const required_fields = ['first_name', 'last_name', 'email', 'password'];

      for (const field of required_fields) {
        if (!httpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
          return {
            status_code: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      if (!validator.isEmail(httpRequest.body.email)) {
        return {
          status_code: 400,
          body: 'E-mail is invalid',
        };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return {
        status_code: 201,
        body: user,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        status_code: 500,
        body: 'Something went wrong',
      };
    }
  }
}
