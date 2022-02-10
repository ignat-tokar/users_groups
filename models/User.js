const {Schema, model, Types} = require('mongoose');

const schema = Schema({
  username: {type: String},
  create: {type: Date, default: Date.now},
  groups: {type: Array}
});

module.exports = model('User', schema);