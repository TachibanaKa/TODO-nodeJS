const methods = require("../model/index.js");
/*
用户类
1、 
 */
class User {
  constructor() {
    this.name = "";
    this.todoList = [];
  }
  getUserData(target = {}, callback) {
    methods.connect("search", "user", { target: target }, (data) => {
      callback(data);
    });
  }
  register(param, callback) {
    console.log(param, 1);
    methods.connect("create", "user", param, (data) => {
      callback(data);
      if(data.code = 200){
        callback(data)
      }
    });
  }
}
let user = new User()

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
module.exports = {
  User,
};
