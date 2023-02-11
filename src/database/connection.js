const config = require('config');
const mongoose = require('mongoose');

module.exports = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('==> MongoDB Connected');
  } catch (error) {
    console.log('Error ============');
    console.log(error);
    process.exit(1);
  }
};
