const config = require('config');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports.Connect = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports.Disconnect = async () => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports.DeleteAllDocuments = async () => {
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) =>
      collection.deleteMany(),
    ),
  );
};
