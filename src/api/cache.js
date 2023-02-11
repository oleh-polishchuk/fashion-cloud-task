const CacheService = require('../services/cache-service');

module.exports = (app) => {
  const service = new CacheService();

  app.get('/cache', async (req, res, next) => {
    try {
      const { key } = req.query;
      const { data } = await service.GetCache({ key });
      return res.json({ data: data.data });
    } catch (err) {
      next(err);
    }
  });

  app.get('/cache/keys', async (req, res, next) => {
    try {
      const { data } = await service.GetCacheKeys();
      return res.json({ data: data });
    } catch (err) {
      next(err);
    }
  });
};
