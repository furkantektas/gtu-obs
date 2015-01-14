var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: 'GTU - Login' });
});

router.post('/', function(req, res) {
  var request = require('request');
  var cookies = request.jar();

  // var derslers = function() {
  //   var derslerUrl = 'https://ogrenci.gyte.edu.tr/api/ogrenciders';
  //   // request.get(image_url).pipe(response);
  //   // console.dir(cookies);
  //   var cookies = req.signedCookies.login;
  //   var headers = req.signedCookies.headers;

  //   request.get({
  //           url:derslerUrl,
  //           jar: cookies,
  //           header: headers
  //       },function(error, respo, body){
  //         console.dir(body);
  //           res.render('dersler', { title: 'GTU - Derslerim', data: body });
  //       });
  // };

    request.post({
      url: "https://ogrenci.gyte.edu.tr/session/login",
      jar: cookies,
      form: {
        'login':req.body.login, 
        'password':req.body.password, 
        'language':'tr-TR'
      }
    }, function(error, resp, body) {
        body = JSON.parse(body);
        if(body === '' || body === {} || !body.success)
          res.render('index', { title: 'GTU - Derslerim', error: 'Bilgileriniz hatalı!'});
        else {
          res.cookie('login',cookies,{signed:true});
          res.cookie('headers',resp.headers,{signed:true});
          var derslerUrl = 'https://ogrenci.gyte.edu.tr/api/ogrenciders';
          var userInfo = body.data.userInfo;
          request.get({
              url:derslerUrl,
              jar: cookies,
              header: resp.headers
          },function(error, respo, body){
              res.render('dersler', { title: 'GTU - Derslerim', data: JSON.parse(body), userInfo : userInfo });
          });
        }
    });
});


module.exports = router;
