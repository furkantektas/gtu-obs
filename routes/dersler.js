var express = require('express');
var router = express.Router();

var fetchDersler = function (req,res,login,password) {
  var request = require('request');

  request.get({
    url: 'https://ogrenci.gyte.edu.tr/api/ogrenciders',
    auth: {
      user: login,
      pass: password
    }}, function(error, resp, body) {
      req.session.login = login;
      req.session.password = password;
      var viewFile = 'dersler';
      if(req.xhr)
        viewFile = 'partial-dersler';
      res.render(viewFile, { title: 'GTÜ - Derslerim', data: JSON.parse(body), userInfo : login});
    });
};

router.get('/', function(req, res) {
  console.dir(req.session);
  console.dir(req.session.login);

  if(req.session.login !== undefined && req.session.password !== undefined)
    fetchDersler(req,res,req.session.login,req.session.password);
  else
    res.render('index', { title: 'GTÜ - Login' });
});

router.post('/', function(req, res) {
  fetchDersler(req,res,req.body.login,req.body.password);
});

router.get('/transkript', function(req,res) {
  var request = require('request');
  var cookies = request.jar();
  request.post({
    url: "https://ogrenci.gyte.edu.tr/session/login",
    jar: cookies,
    form: {
      'login':req.session.login, 
      'password':req.session.password, 
      'language':'tr-TR'
    }
  }, function(error, resp, body) {
      body = JSON.parse(body);
      if(body === '' || body === {} || !body.success)
        res.render('index', { title: 'GTÜ - Login', error: 'Bilgileriniz hatalı!'});
      else {
        var transkriptUrl = 'https://ogrenci.gyte.edu.tr/trn01/Png/null';
        var requestObj = {
          url:transkriptUrl,
          jar: cookies,
          header: resp.headers
        };
        request.get(requestObj).pipe(res);
      }
  });
  
  
});


module.exports = router;