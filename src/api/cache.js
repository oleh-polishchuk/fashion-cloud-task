const httpStatus = require('http-status');
const CacheService = require('../services/cache-service');

module.exports = (app) => {
  const service = new CacheService();

  app.get('/cache/:key', async (req, res, next) => {
    try {
      const { key } = req.params;
      const { data } = await service.GetCache({ key });
      return res.json({ data: data.data });
    } catch (err) {
      next(err);
    }
  });

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

  app.get('/keys', async (req, res, next) => {
    try {
      const { data } = await service.GetCacheKeys();
      return res.json({ data: data });
    } catch (err) {
      next(err);
    }
  });
};
