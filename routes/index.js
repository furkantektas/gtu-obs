var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GTÜ - Login' });
});

router.get('/logout', function(req,res) {
    req.session.destroy();
    res.render('index', { title: 'GTÜ - Login' });
});
module.exports = router;
