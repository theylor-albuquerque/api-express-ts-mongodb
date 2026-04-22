import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(port, () => console.log(`listening on port ${port}!`));
