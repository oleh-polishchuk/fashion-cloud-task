require('dotenv').config();
require('./validations/config.validation');

const config = require('config');
const express = require('express');

const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const logger = require('./utils/logger');

const StartServer = async () => {
  const app = express();

  await databaseConnection.Connect();

  await expressApp(app);

  app
    .listen(config.app.port, () => {
      logger.info(`Server is up and running on port ${config.app.port}`);
    })
    .on('error', (err) => {
      logger.error(err);
      process.exit();
    });
};

StartServer();
