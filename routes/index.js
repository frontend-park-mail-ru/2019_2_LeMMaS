let express = require("express");
let router = express.Router();
let path = require("path");

/* GET home page. */
router.get("/", function(req, res) {
  res.sendFile("public/www/index.html", {
    root: path.join(__dirname, "../")
  });
});

module.exports = router;
