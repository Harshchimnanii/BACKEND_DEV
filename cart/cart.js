const express = require('express');
const router = express.Router();

const initCart = (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
};

router.use(initCart);

router.post('/add', (req, res) => {
  const { productId, price, quantity } = req.body;

  const item = req.session.cart.find(i => i.productId === productId);
  if (item) item.quantity += quantity;
  else req.session.cart.push({ productId, price, quantity });

  res.json(req.session.cart);
});

router.get('/', (req, res) => {
  const total = req.session.cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  res.json({ items: req.session.cart, total });
});

module.exports = router;
