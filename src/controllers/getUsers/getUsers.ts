import { IGetUsersController, IGetUsersRepository } from './protocols';

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return {
        status_code: 200,
        body: users,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return {
        status_code: 500,
        body: 'Something went wrong',
      };
    }
  }
}
