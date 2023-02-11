const { CacheRepository } = require('../database');
const { FormatData, GenerateRandomData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class CacheService {
  constructor() {
    this.repository = new CacheRepository();
  }

  async CreateOrUpdate({ key, data }) {
    try {
      let isNew;
      let existingCache = await this.repository.FindCacheByKey({ key });
      if (existingCache) {
        isNew = false;
        existingCache = await this.repository.UpdateCache({ key, data });
      } else {
        isNew = true;
        existingCache = await this.repository.CreateCache({ key, data });
      }
      existingCache.isNew = isNew;
      return FormatData(existingCache);
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }

  async GetCache({ key }) {
    try {
      let existingCacheRecord = await this.repository.FindCacheByKey({ key });
      if (existingCacheRecord) {
        console.log(`==> Cache hit`);
        await this.repository.ResetCacheExpirationDateByKey({ key });
      } else {
        console.log(`==> Cache miss`);
        const data = GenerateRandomData();
        existingCacheRecord = await this.repository.CreateCache({ key, data });
      }
      return FormatData(existingCacheRecord);
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }

  async GetCacheKeys() {
    try {
      const cacheKeys = await this.repository.ListKeys();
      const keys = cacheKeys.map((cacheKey) => cacheKey.key);
      return FormatData(keys);
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }

  async DeleteByKey({ key }) {
    try {
      await this.repository.DeleteByKey({ key });
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }

  async DeleteAll() {
    try {
      await this.repository.DeleteAll();
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }
}

module.exports = CacheService;
