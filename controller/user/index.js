const { response } = require("express");
const methods = require("../../model/index.js");
const token = require("../../utils/token.js")
/*
用户类
1、 
 */
class User {
  constructor() {
    this.name = "";
    this.account = ''
    this.password = ''
    this.todoList = [];
  }
  getUserData(target = {}, callback) {
    methods.connect("search", "user", { target: target }, (data) => {
      callback(data);
    });
  }
  createUser(data, callback){
    methods.connect("create", "user", data, (data)=>{
      callback(data)
    })
  }
}
let user = new User()
let result = {
  code: 200,
  data: null
}
/* 登陆 */
function login(req, response){
  user.getUserData(req, function (res) {
    if (res.data.length!==0 && res.code==200) {
      let userToken = token.setToken(res.data[0].account,res.data[0].id)
      result.code = 200;
      result.data = "登录成功";
      result.token = userToken
      response.send(result);
      return;
    }
    result.code = 301;
    result.data = "未注册或密码错误";
    response.send(result);
  });
}
/* 注册 */
function register(req, response){
  user.getUserData({account: req.account}, function(res){
    if(res.data.length != 0 && res.code==200){
      result = {
        code : 301,
        data : "账号已注册"
      }
      response.send(result)
      return
    }
    methods.getId('userId',(id)=>{
      req.id = id
      user.createUser(req, function (resChild){
        if(resChild.code==200){
          result = {
            code : 200,
            data : "注册成功"
          }
          response.send(result)
        }
      })
    })
  })
}
module.exports = {
  login,
  register
};
