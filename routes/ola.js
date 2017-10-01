var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/tokens', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
