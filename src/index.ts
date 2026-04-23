import * as dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { GetUsersController } from './controllers/getUsers/getUsers';
import { MongoGetUsersRepository } from './repositories/getUsers/mongoGetUsers';
import { MongoClient } from './database/mongo';

const main = async () => {
  const app = express();

  await MongoClient.connect();

  app.get('/users', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, status_code } = await getUsersController.handle();

    res.send(body).status(status_code);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
