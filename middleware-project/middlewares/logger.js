const fs = require('fs');

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const log = `${new Date().toISOString()} | ${req.method} ${req.url} | Status: ${res.statusCode} | ${Date.now() - start}ms\n`;
    
    fs.appendFile('logs.txt', log, (err) => {
      if (err) console.error(err);
    });
  });

  next();
};

module.exports = loggerMiddleware;