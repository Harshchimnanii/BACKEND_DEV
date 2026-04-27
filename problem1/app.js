const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use(limiter);

app.post('/login', (req,res)=>{
  res.send("Secure login placeholder");
});

app.listen(3000, ()=>console.log("Server running"));
