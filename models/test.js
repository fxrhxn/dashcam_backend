var mongoose = require('mongoose')

var testSchema = new mongoose.Schema({
  test : String
});

var test = mongoose.model('test', testSchema)

module.exports = test
