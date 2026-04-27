import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { GetUsersController } from './controllers/getUsers/getUsers';
import { MongoGetUsersRepository } from './repositories/getUsers/mongoGetUsers';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/createUser/mongoCreateUser';
import { CreateUserController } from './controllers/createUser/createUser';
import { MongoUpdateUserRepository } from './repositories/updateUser/mongoUpdateUser';
import { UpdateUserController } from './controllers/updateUser/updateUser';

const main = async () => {
  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get('/users', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, status_code } = await getUsersController.handle();

    res.status(status_code).send(body);
  });

  app.post('/users', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const { body, status_code } = await createUserController.handle({
      body: req.body,
    });

    res.status(status_code).send(body);
  });

  app.patch('/users/:id', async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository,
    );

    const { body, status_code } = await updateUserController.handle({
      params: req.params,
      body: req.body,
    });

    res.status(status_code).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
