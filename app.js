require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { errors } = require('celebrate');
const router = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(handleErrors);

async function main() {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Слушаем порт ${PORT}`);
  });
}

main();
