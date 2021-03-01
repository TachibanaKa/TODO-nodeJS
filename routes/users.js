var express = require("express");
var router = express.Router();
let User = require("../model/user/index.js");
let paramModule = require("./parameCheck");
User = User.User;
const user = new User();
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
  user.getUserData(req.query, (res) => {
    if (res.data.length == 0) {
      res.code = 301;
      res.data = "该用户未注册";
    }
    response.send(res);
  });
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
  user.getUserData(req.query, function (data) {
    if (data.length !== 0) {
      result.code = 200;
      result.data = "登录成功";
      response.send(result);
      return;
    }
    result.code = 301;
    result.data = "未注册或密码错误";
    response.send(result);
  });
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
  user.getUserData({ account: req.query.account }, function (data) {
    if (data.data.length !== 0) {
      result = {
        code: 301,
        data: "账号已经注册",
      };
    } else {
      user.register(req.query, function (data) {
        if (data == "添加成功") {
          result = {
            code: 200,
            data: data,
          };
        }
      });
    }
    response.send(result);
  });
  /*   user.getUserData(req.query, function (data) {
    if (data.length !== 0) {
      result.code = 200;
      result.data = "注册成功";
      res.send(result);
    }
    result.code = 301;
    result.data = "账号已被注册";
    res.send(result);
  }); */
});
module.exports = router;
