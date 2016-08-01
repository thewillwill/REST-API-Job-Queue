var Job = require('./schema-model');
var rp = require('request-promise');
var _ = require('lodash');
var moment = require('moment');
var validUrl = require('valid-url');
var validate = require('validate.js');


exports.params = function(req, res, next, id) {
  Job.findById(id)
    .then(function(job) {
      if (!job) {
        next(new Error('No job with that id'));
      } else {
        req.job = job;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Job.find({})
    .then(function(jobs) {
      res.json(jobs);
    }, function(err) {
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  //req.job is assigned in params fn
  var job = req.job;
  res.json(job);
};

exports.put = function(req, res, next) {
  var job = req.job;

  var update = req.body;

  _.merge(job, update);

  job.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function(req, res, next) {
  var newjob = req.body;
  newjob.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');

  Job.create(newjob)
    .then(function(job) {
      //job.status = 'Your job in in progress';
      res.json(job);
      return job;
    }, function(err) {
      next(err);
    })
    .then(function(job) {
//checks for valid url syntax (alllows for both http & https)      
validate({website: job.url}, {website: {url: true}});
      rp(job.url)
        .then(function(html) {
          job.html = html;
          job.status = 'Your job is completed';
          job.save();
        }, function(err) {
          console.log('Sorry, your url is active', err.message);
          next(err);
        })
    }, function(err) {
      next(err);
    })
};

exports.delete = function(req, res, next) {
  req.job.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
