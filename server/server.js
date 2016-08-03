var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require("morgan");

var router = require('./../router/api-routes.js');

//app.use- application level middleware 

//logs server activity to console
app.use(morgan('dev'));
//for parsing application/x--www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//converts post data to json
app.use(bodyParser.json());
//whenever req comes in for /api, mount 
app.use('/api/v1', router);


app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.stack);
    res.status(500).send(err);
  }
});

var port = 3000;
app.listen(3000, function() {
  console.log('App listening to port', port);
});

module.exports = app;

