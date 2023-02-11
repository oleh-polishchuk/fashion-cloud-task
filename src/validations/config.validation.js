const config = require('config');
const Joi = require('joi');

const envVarsSchema = Joi.object().keys({
  environment: Joi.string()
    .valid('development', 'production', 'test')
    .required(),
  app: Joi.object()
    .keys({
      port: Joi.number().required(),
    })
    .required(),
  cache: Joi.object()
    .keys({
      ttl: Joi.number().required(),
    })
    .required(),
  mongodb: Joi.object()
    .keys({
      url: Joi.string().required(),
    })
    .required(),
});

const { error } = envVarsSchema.validate(config);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
