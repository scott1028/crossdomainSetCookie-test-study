var express = require('express');
var router = express.Router();
var faker = require('faker');
var jquery = require('jquery');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/setCookie', function(req, res, next) {
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`);
  res.json({ status: 'OK!' });
});

module.exports = router;
