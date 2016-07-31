var _ = require('lodash');

var apiRouter = require('express').Router();

var jobs = [];
var id = 0;

var updateId = function(req, res, next) {
  id++;
  req.body.id = id + '';
  next();
};

//param middleware to validate user's job id request
apiRouter.param('id', function(req, res, next, id) {
  //search through jobs array to see if id exists
  var job = _.find(jobs, { "id": id });
  if (job) {
    req.job = job;
  } else {
    res.status(404);
  }
});

apiRouter.post('/v1/url', updateId, function(req, res) {
  var url = req.body;

  var response = {
    "jobId": id,
    "message": 'Your job has been added to the job queue.'
  };
  jobs.push(url);
  res.json(response);

});

apiRouter.get('/v1', function(req, res, next){
  res.json(jobs)
});


apiRouter.get('/v1/:id', function (req, res){
  var job = req.job;
  res.json(job)
});

apiRouter.put('/v1/:updatejob', function (req, res){
  //protects against changing id
  var update = req.body;
  if(update.id){
    delete update.id;
  }
//search for job id to see if exists
  //findIndex takes in array, returns index if matches obj property
  var job = _.findIndex(jobs, {id: req.params.updatejob});
  console.log('jobs', jobs);
  console.log('params id', req.params.id)
  //if jobid isn't found, send 404
  if(!jobs[job]){
    res.status(404);
  } else {
    //assign merges update obj with jobs obj
    var updatedJob = _.assign(jobs[job], update);
    res.json(updatedJob);
  }
});

module.exports = apiRouter;