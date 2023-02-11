const config = require('config');
const httpStatus = require('http-status');

const { CacheModel } = require('../models');
const { GetExpirationDate } = require('../../utils');
const ApiError = require('../../utils/ApiError');

class CacheRepository {
  async CreateCache({ key, data }) {
    try {
      const expiresAt = GetExpirationDate(config.cache.ttl);
      const cache = new CacheModel({ key, data, expiresAt });
      return cache.save();
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async ListKeys() {
    try {
      return CacheModel.find({}, { _id: 0, key: 1 });
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async FindCacheByKey({ key }) {
    try {
      return CacheModel.findOne({ key: key });
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async FindOldestCacheItem() {
    try {
      const items = await CacheModel.find().sort({ expiresAt: 1 }).limit(1);
      return items[0];
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async UpdateCache({ key, data }) {
    try {
      const expiresAt = GetExpirationDate(config.cache.ttl);
      return CacheModel.findOneAndUpdate(
        { key },
        { data, expiresAt },
        { new: true },
      );
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async DeleteByKey({ key }) {
    try {
      return CacheModel.deleteOne({ key });
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async DeleteAll() {
    try {
      return CacheModel.deleteMany({});
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async ResetCacheExpirationDateByKey({ key }) {
    try {
      const expiresAt = GetExpirationDate(config.cache.ttl);
      await CacheModel.findOneAndUpdate({ key }, { expiresAt }, { new: true });
    } catch (err) {
      throw ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  Count() {
    return CacheModel.count();
  }
}

module.exports = CacheRepository;
