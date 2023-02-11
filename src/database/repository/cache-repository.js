const { CacheModel } = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class CacheRepository {
  async CreateCache({ key, data }) {
    try {
      const cache = new CacheModel({ key, data });
      return cache.save();
    } catch (err) {
      throw APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Create Customer',
      );
    }
  }

  async ListKeys() {
    try {
      return CacheModel.find({}, { _id: 0, key: 1 });
    } catch (err) {
      throw APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Find Cache Record',
      );
    }
  }

  async FindCacheByKey({ key }) {
    try {
      return CacheModel.findOne({ key: key });
    } catch (err) {
      throw APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Find Cache Record',
      );
    }
  }

  async UpdateCache({ key, data }) {
    try {
      return CacheModel.findOneAndUpdate({ key }, { data }, { new: true });
    } catch (err) {
      throw APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Find Cache Record',
      );
    }
  }
}

module.exports = CacheRepository;
