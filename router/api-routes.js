var _ = require('lodash');
var request = require('request');
var controller = require('./../database/controller.js');
var router = require('express').Router();

router.param('id', controller.params);

router.route('/url')
  .get(controller.get)
  .post(controller.post);


router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;