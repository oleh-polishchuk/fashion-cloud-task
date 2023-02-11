const { CacheModel } = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class CacheRepository {
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
}

module.exports = CacheRepository;
