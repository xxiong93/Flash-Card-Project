const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    minlength: 1,
  },
  definition: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports.schema = cardSchema;
module.exports.Card = mongoose.model('Card', cardSchema);
