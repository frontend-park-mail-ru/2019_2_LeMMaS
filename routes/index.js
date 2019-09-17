let express = require('express');
let router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('www/index.html', {
    root: path.join(__dirname, '../')
  })
});

module.exports = router;
