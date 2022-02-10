const {Schema, model, Types} = require('mongoose');

const schema = Schema({
  name: {type: String},
  description: {type: String, required: false}
});

module.exports = model('Group', schema);