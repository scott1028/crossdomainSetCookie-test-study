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
  res.json({ status: `OK! ${req.path}` });
});

router.post('/setCookie', function(req, res, next) {
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`);
  res.json({ status: `OK by POST Method! ${req.path}` });
});

router.get('/Test', function(req, res, next) {
  res.json({ status: `Tested-${new Date().getTime()} ${req.path}` });
});

router.get('/Test2', function(req, res, next) {
  console.log('Origin of Client', req.get('Origin'));
  // override
  // Access-Control-Allow-Origin: *
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ status: `Tested-${new Date().getTime()} ${req.path}` });
});

router.get('/Test3', function(req, res, next) {
  console.log('Origin of Client', req.get('Origin'));
  // override
  //
  // Access-Control-Allow-Origin: *  <-- 以前只要這個 Header 現在要改成兩行, 還要指定 Origin 不能式 wildcard=*
  //
  res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3001');
  res.set('Access-Control-Allow-Credentials', true);
  res.json({ status: `Tested-${new Date().getTime()} ${req.path}` });
});

router.get('/withoutAcessControllAllowAll/setCookie', function(req, res, next) {
  res.removeHeader('Access-Control-Allow-Origin');
  res.removeHeader('Access-Control-Allow-Credentials');
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`);
  res.json({ status: `OK! ${req.path}` });
});
router.get('/withoutAcessControllAllowAll/Test', function(req, res, next) {
  res.removeHeader('Access-Control-Allow-Origin');
  res.removeHeader('Access-Control-Allow-Credentials');
  res.json({ status: `Tested-${new Date().getTime()} ${req.path}` });
});

router.get('/withoutAcessControllAllowCredential/setCookie', function(req, res, next) {
  res.removeHeader('Access-Control-Allow-Credentials');
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`);
  res.json({ status: `OK! ${req.path}` });
});
router.get('/withoutAcessControllAllowCredential/Test', function(req, res, next) {
  res.removeHeader('Access-Control-Allow-Credentials');
  res.json({ status: `Tested-${new Date().getTime()} ${req.path}` });
});

router.get('/withoutAcessControllAllowOrigin/setCookie', function(req, res, next) {
  res.removeHeader('Access-Control-Allow-Origin');
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`);
  res.json({ status: `OK! ${req.path}` });
});
router.get('/withoutAcessControllAllowOrigin/Test', function(req, res, next) {
  res.removeHeader('Access-Control-Allow-Origin');
  res.json({ status: `Tested-${new Date().getTime()} ${req.path}` });
});

module.exports = router;
