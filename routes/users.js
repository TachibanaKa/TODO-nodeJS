var express = require("express");
var router = express.Router();
let user = require("../controller/user/index.js");
let paramModule = require("../utils/parameCheck");
/* GET users listing. */
let result = {
  code: 200,
  data: null,
};

router.get("/getUser", function (req, response, next) {
  //校验参数
  let paramResult = paramModule.parameCheck(req.query, [
    { name: "account", type: "str" },
  ]);
  if (paramResult !== 200) {
    result = {
      code: 301,
      data: paramResult,
    };
    response.send(result);
    return;
  }
/*   user.getUserData(req.query, (res) => {
    if (res.data.length == 0) {
      res.code = 301;
      res.data = "该用户未注册";
    }
    response.send(res);
  }); */
});
/* 登录 */
router.get("/login", function (req, response, next) {
  let paramResult = paramModule.parameCheck(req.query, [
    {
      name: "account",
      type: "str",
    },
    {
      name: "password",
      type: "str",
    },
  ]);
  if (paramResult !== 200) {
    result = {
      code: 301,
      data: paramResult,
    };
    response.send(result);
    return;
  }
  user.login({ account: req.query.account, password: req.query.password }, response)
});
/* 注册 */
router.get("/register", function (req, response, next) {
  let paramResult = paramModule.parameCheck(req.query, [
    {
      name: "account",
      type: "str",
    },
    {
      name: "password",
      type: "str",
    },
  ]);
  if (paramResult !== 200) {
    result = {
      code: 301,
      data: paramResult,
    };
    response.send(result);
    return;
  }
  user.register({ account: req.query.account, password: req.query.password },response)

});
module.exports = router;
