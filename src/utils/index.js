const { v4: uuidv4 } = require('uuid');

module.exports.FormatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};

module.exports.GenerateRandomData = () => {
  return uuidv4();
};
