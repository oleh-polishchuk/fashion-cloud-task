require('dotenv').config();
require('./validations/config.validation');

const config = require('config');
const express = require('express');

const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  app
    .listen(config.app.port, () => {
      console.log(
        `==> Server is up and running on http://localhost:${config.app.port}`,
      );
    })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
