const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => console.log("Server started"));
