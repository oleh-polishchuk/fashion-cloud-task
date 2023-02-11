const { CacheRepository } = require('../database');
const { FormatData, GenerateRandomData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class CacheService {
  constructor() {
    this.repository = new CacheRepository();
  }

  async GetCache({ key }) {
    try {
      let existingCacheRecord = await this.repository.FindCacheByKey({ key });
      if (existingCacheRecord) {
        console.log(`==> Cache hit`);
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
}

module.exports = CacheService;
