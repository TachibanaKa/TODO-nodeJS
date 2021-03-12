var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/search", function (req, res, next) {
  model.connect('search', 'test', function (data) {
    var params = {
      code: 200,
      data: data
    };
    res.send(params);
  });
});

router.get("/update", function (req, res, next) {
  model.connect('update', 'test', function (data) {
    var params = {
      code: 200,
      data: data
    };
    res.send(params);
  });
});

router.get("/del", function (req, res, next) {
  model.connect('del', 'test', function (data) {
    var params = {
      code: 200,
      data: data
    };
    res.send(params);
  });
});

router.get("/create", function (req, res, next) {
  model.connect('create', 'test', function (data) {
    var params = {
      code: 200,
      data: data
    };
    res.send(params);
  });
});

module.exports = router;
