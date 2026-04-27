const sanitize = (req, res, next) => {
  const clean = (str) => str.replace(/<[^>]*>?/gm, '');

  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = clean(req.body[key]);
      }
    }
  }

  next();
};

module.exports = sanitize;