var app = require('./../server/server.js')
var request = require('supertest');
var should = require('chai').should();
var mongoose = require('mongoose');


describe('Routing', function() {
  var url = 'http://localhost:3000/api/v1';

    beforeEach(function(done) {
      mongoose.createConnection("mongodb://localhost/testdb");
      return done();
  });


describe('Job Queue', function() {

  it('should return a proper response message', function(done) {
    var job = {
      url: 'http://www.google.com'
    };
    request( url)
      .post('/url')
      .send(job)
      .expect('Content-Type', /json/)
      // end handles the response
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.any.keys('__v', '_id', 'status', 'url', 'createdAt')
        done();
      });
  });
});

});