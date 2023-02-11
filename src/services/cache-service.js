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
      if (!existingCacheRecord) {
        const data = GenerateRandomData();
        existingCacheRecord = await this.repository.CreateCache({ key, data });
      }
      return FormatData(existingCacheRecord);
    } catch (err) {
      throw new APIError('Data Not found', err);
    }
  }
}

module.exports = CacheService;
