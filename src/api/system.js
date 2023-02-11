module.exports = (app) => {
  app.get('/', async (req, res, next) => {
    try {
      const message = `The server is up and running! \nUptime: ${process.uptime()}`;
      return res.send(message);
    } catch (err) {
      next(err);
    }
  });
};
