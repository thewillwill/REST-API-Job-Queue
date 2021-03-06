var mongoose = require('mongoose');
//because mongoose promises are depreciated 
mongoose.Promise = require('bluebird');

//connects mongo db
mongoose.connect('mongodb://localhost/jobDatabase');

var JobSchema = new mongoose.Schema({
  status: {
    type: String,
    default: 'Your job in in progress',
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: String
  },
  html: {
    type: String
  }
});

module.exports = mongoose.model('jobs', JobSchema);
