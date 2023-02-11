const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');

const ApiError = require('./utils/ApiError');
const { system, cache } = require('./api');
const { errorHandler, errorConverter } = require('./middlewares/error');

module.exports = async (app) => {
  // set security HTTP headers
  app.use(helmet());

  // parse json request body
  app.use(express.json({ limit: '1mb' }));

  // parse urlencoded request body
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // sanitize request data
  app.use(xss());

  // gzip compression
  app.use(compression());

  // enable cors
  app.use(cors());
  app.options('*', cors());

  // api routes
  system(app);
  cache(app);

  // handle any unknown api request
  app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);
};
