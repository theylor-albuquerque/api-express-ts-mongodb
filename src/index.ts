import express from 'express';
import * as dotenv from 'dotenv';
import { GetUsersController } from './controllers/getUsers/getUsers';
import { MongoGetUsersRepository } from './repositories/getUsers/mongoGetUsers';

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.get('/users', async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();

  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, status_code } = await getUsersController.handle();

  res.send(body).status(status_code);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
