var express = require('express');
var router = express.Router();
var faker = require('faker');
var jquery = require('jquery');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* NOTE:
     Caveat!! Received "set-cookie" of response's header will not work for cross domain situation.
     ex: fetch('http://127.0.0.1:3000') on "abc.com"
         and then open location.href = 'http://127.0.0.1:3000' from "abc.com"
         finally, no cookie found on 127.0.0.1

     but you can still use a <img /> tag to achieve it. Take a look at "/crossDomainCookieSet"

     20201224: Now this will not work anymore.

     By default there is a setting in chrome

     Privacy and Security/Block third-party cookies in Incognito
      => Sites can use cookies to improve your browsing experience, for example, to keep you signed in or to remember items in your shopping cart
      => While in incognito, sites can't use your cookies to see your browsing activity across different sites, for example, to personalize ads. Features on some sites may break.
 */
router.get('/setCookie', function(req, res, next) {
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`, {
    sameSite: 'none' || 'lax' || 'strict',
    // Ref: https://github.com/GoogleChromeLabs/samesite-examples/issues/26
    secure: true, // Marks the cookie to be used with HTTPS only. Once you set 'none' you should enable Secure flag
  });
  res.json({ status: `OK! ${req.path}` });
});

router.post('/setCookie', function(req, res, next) {
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`, {
    sameSite: 'none' || 'lax' || 'strict',
    secure: true, // Marks the cookie to be used with HTTPS only. Once you set 'none' you should enable Secure flag
  });
  res.json({ status: `OK by POST Method! ${req.path}` });
});

/* GET home page. */
router.get('/crossDomainCookieSet', function(req, res, next) {
  res.render('crossDomainCookieSet', { title: 'Express' });
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
