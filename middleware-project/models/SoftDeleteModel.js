const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  deleted: {
    type: Boolean,
    default: false
  }
});

schema.pre(/^find/, function(next) {
  this.where({ deleted: false });
  next();
});

module.exports = mongoose.model('SoftDelete', schema);