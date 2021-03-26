var express = require("express");
var router = express.Router();
let todo = require("../controller/todo/index.js");
let paramModule = require("../utils/parameCheck");
let token = require('../utils/token')
/* GET users listing. */
let result = {
  code: 200,
  data: null,
};
/* 查询某用户所有todo */
router.get("/getTodo", function (req, response, next) {
  //验证token
  let myToken = token.verToken(req.headers.authorization)
  if(myToken != null){
    result.code = 301
    result.data = 'token失效'
    response.send(result)
  }
  //校验参数
  let paramResult = paramModule.parameCheck(req.query, [
  ]);
  if (paramResult !== 200) {
    result = {
      code: 301,
      data: paramResult,
    };
    response.send(result) 
    return
  }
  todo.searchTodo(req.query, response)
});

/* 新增todo */
router.get("/createTodo", function (req, response, next) {
  //验证token
  let myToken = token.verToken(req.headers.authorization)
  if(myToken != null){
    result.code = 301
    result.data = 'token失效'
    response.send(result)
  }
  let allParams = ['id','userId','username','title','content','priority','addTime','updateTime','deadline','planTime','state']
  //校验参数
  let paramResult = paramModule.parameCheck(req.query, [
    { name: "userId", type: "str" },
    { name: "priority", type: "str" },
    { name: "title", type: "str" },
  ]); 
  if (paramResult !== 200) {
    result = {
      code: 301,
      data: paramResult,
    };
    response.send(result)
    return
  }
  //设置参数默认值
  allParams.map(item=>{
    if(!req.query[item]){
      req.query[item] = ''
    }
  })
  todo.createTodo(req.query, response)
});
/* 删除todo */
router.get("/delTodo", function (req, response, next) {
  //验证token
  let myToken = token.verToken(req.headers.authorization)
  if(myToken != null){
    result.code = 301
    result.data = 'token失效'
    response.send(result)
  }
  //校验参数
  let paramResult = paramModule.parameCheck(req.query, [
    { name: "id", type: "str" },
  ]);
  if (paramResult !== 200) {
    result = {
      code: 301,
      data: paramResult,
    };
    response.send(result)
    return
  }
  todo.delTodo(req.query, response)
});

/* 修改todo */
router.get("/updateTodo", function (req, response, next) {
  //验证token
  let myToken = token.verToken(req.headers.authorization)
  if(myToken != null){
    result.code = 301
    result.data = 'token失效'
    response.send(result)
  }
  //校验参数
  let paramResult = paramModule.parameCheck(req.query, [
    { name: "id", type: "str" },
    { name: "newData", type: "obj"}
  ]);
  if (paramResult !== 200) {
    result = {
      code: 301,
      data: paramResult,
    };
    response.send(result)
    return
  }
  todo.updateTodo(req.query, response)
});


module.exports = router;
