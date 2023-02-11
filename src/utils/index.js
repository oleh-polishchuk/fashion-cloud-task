const { v4: uuidv4 } = require('uuid');
const dateFns = require('date-fns');

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

module.exports.GetExpirationDate = (seconds = 0) => {
  return dateFns.add(new Date(), { seconds });
};
