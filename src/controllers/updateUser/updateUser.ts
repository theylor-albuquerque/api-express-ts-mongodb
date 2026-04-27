import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';
import {
  IUpdateUserController,
  IUpdateUserParams,
  IUpdateUserRepository,
} from './protocols';

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    const id = httpRequest?.params?.id;
    const body = httpRequest?.body;

    try {
      if (!id) {
        return {
          status_code: 400,
          body: 'Missing user id',
        };
      }

      const alloweds_field_to_update: (keyof IUpdateUserParams)[] = [
        'first_name',
        'last_name',
        'password',
      ];

      const some_fields_allowed_to_update = Object.keys(body).some(
        (key) =>
          !alloweds_field_to_update.includes(key as keyof IUpdateUserParams),
      );

      if (some_fields_allowed_to_update) {
        return {
          status_code: 400,
          body: 'Some received field is not allowed',
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        status_code: 204,
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
