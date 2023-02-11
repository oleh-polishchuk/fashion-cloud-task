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
        'Unable to Create Cache',
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
        'Unable to List Cache Records',
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
        'Unable to Update Cache Record',
      );
    }
  }

  async DeleteByKey({ key }) {
    try {
      return CacheModel.deleteOne({ key });
    } catch (err) {
      throw APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Delete Cache Record',
      );
    }
  }

  async DeleteAll() {
    try {
      return CacheModel.deleteMany({});
    } catch (err) {
      throw APIError(
        'API Error',
        STATUS_CODES.INTERNAL_ERROR,
        'Unable to Delete All Cache Records',
      );
    }
  }
}

module.exports = CacheRepository;
