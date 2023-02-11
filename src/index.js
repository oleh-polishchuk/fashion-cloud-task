require('dotenv').config();
require('./validations/config.validation');

const config = require('config');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'FashionCloud API',
        version: '0.0.1',
        description: 'FashionCloud API with Swagger',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/**/*.route.js'],
  };

  const specs = swaggerJsdoc(options);
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true }),
  );

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
