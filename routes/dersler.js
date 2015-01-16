var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: 'GTÜ - Login' });
});

router.post('/', function(req, res) {
  var request = require('request');
  var cookies = request.jar();
  request.get({
    url: 'https://ogrenci.gyte.edu.tr/api/ogrenciders',
    auth: {
      user: req.body.login,
      pass: req.body.password
    }}, function(error, resp, body) {
      var viewFile = 'dersler';
      if(req.xhr)
        viewFile = 'partial-dersler';
      res.render(viewFile, { title: 'GTÜ - Derslerim', data: JSON.parse(body), userInfo : req.body.login});
    });
});


module.exports = router;
