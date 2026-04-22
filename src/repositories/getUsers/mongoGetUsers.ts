import { IGetUsersRepository } from '../../controllers/getUsers/protocols';
import { User } from '../../models/user';

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        first_name: 'Theylor',
        last_name: 'Oliveira',
        email: 'theylor@gmail.com',
        password: '123',
      },
    ];
  }
}
