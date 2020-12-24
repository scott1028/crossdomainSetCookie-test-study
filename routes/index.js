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

    Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      [Lax]
        Cookies are not sent on normal cross-site subrequests (for example to load images or frames into a third party site), but are sent when a user is navigating to the origin site (i.e. when following a link).
        This is the default cookie value if SameSite has not been explicitly specified in recent browser versions (see the "SameSite: Defaults to Lax" feature in the Browser Compatibility).
        Lax replaced None as the default value in order to ensure that users have reasonably robust defense against some classes of cross-site request forgery (CSRF) attacks.

        That's where SameSite=Lax comes in by allowing the cookie to be sent with these top-level navigations. Let's revisit the cat article example from above where another site is referencing your content. They make use of your photo of the cat directly and provide a link through to your original article.

      [Strict]
        Cookies will only be sent in a first-party context and not be sent along with requests initiated by third party websites.

      [None]
        Cookies will be sent in all contexts, i.e in responses to both first-party and cross-origin requests.If SameSite=None is set, the cookie Secure attribute must also be set (or the cookie will be blocked).
 */
router.get('/setCookie', function(req, res, next) {
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`, {
    sameSite: 'lax' || 'none' || 'strict',
    // Ref: https://github.com/GoogleChromeLabs/samesite-examples/issues/26
    // secure: true, // Marks the cookie to be used with HTTPS only. Once you set 'none' you should enable Secure flag
  });
  res.json({ status: `OK! ${req.path}` });
});

router.post('/setCookie', function(req, res, next) {
  res.cookie('currentTime', `${new Date().getTime()}_${faker.name.firstName()}`, {
    sameSite: 'lax' || 'none' || 'strict',
    // secure: true, // Marks the cookie to be used with HTTPS only. Once you set 'none' you should enable Secure flag
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
