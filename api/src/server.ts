import express from 'express';
import { dbClient } from '../common/dbClient';
import brazerRouter from './routes/brazer';

const app = express();
app.use(express.json());
app.use('/brazer', brazerRouter);

(async () => {
  await dbClient.connect();
  app.listen(3000, () => {
    console.log('➡️ API-MINU rodando em http://0.0.0.0:3000');
  });
})();
