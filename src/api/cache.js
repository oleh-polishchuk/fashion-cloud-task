const CacheService = require('../services/cache-service');

module.exports = (app) => {
  const service = new CacheService();

  app.get('/cache/:key', async (req, res, next) => {
    try {
      const { key } = req.query;
      const { data } = await service.GetCache({ key });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

};
