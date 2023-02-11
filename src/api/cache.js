const httpStatus = require('http-status');
const CacheService = require('../services/cache-service');

module.exports = (app) => {
  const service = new CacheService();

  /**
   * An endpoint returns the cached data for a given key
   */
  app.get('/cache/:key', async (req, res, next) => {
    try {
      const { key } = req.params;
      const { data } = await service.GetCache({ key });
      return res.json({ data: data.data });
    } catch (err) {
      next(err);
    }
  });

  /**
   * An endpoint returns all stored keys in the cache
   */
  app.get('/keys', async (req, res, next) => {
    try {
      const { data } = await service.GetCacheKeys();
      return res.json({ data: data });
    } catch (err) {
      next(err);
    }
  });

  /**
   * An endpoint creates and updates the data for a given key
   */
  app.put('/cache/:key', async (req, res, next) => {
    try {
      const { key } = req.params;
      const { data } = req.body;
      const response = await service.CreateOrUpdate({ key, data });
      const status = response.data.isNew ? httpStatus.CREATED : httpStatus.OK;
      return res.status(status).json({ data: response.data.data });
    } catch (err) {
      next(err);
    }
  });

  /**
   * An endpoint removes a given key from the cache
   */
  app.delete('/cache/:key', async (req, res, next) => {
    try {
      const { key } = req.params;
      await service.DeleteByKey({ key });
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  });

  /**
   * An endpoint removes all keys from the cache
   */
  app.delete('/cache', async (req, res, next) => {
    try {
      await service.DeleteAll();
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  });
};
