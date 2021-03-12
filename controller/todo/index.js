const { response } = require("express")
const methods = require("../../model/index.js");
/*
todo类
1、 
 */
class Todo {
  constructor(){
    this.id = ''
    this.userId = ''
    this.username = ''
    this.title = ''
    this.content = ''
    this.priority = ''
    this.addTime = ''
    this.updateTime = ''
    this.deadline = ''
    this.planTime = ''
    this.state = ''
  }
  getTodo(userId, callback) {
    methods.connect("search", "todo", { userId: userId }, (data) => {
      callback(data);
    });
  }
  createTodo(data, callback){
    methods.connect("create", "todo", data, (data)=>{
      callback(data)
    })
  }
  delTodo(data, callback){
    methods.connect("del", "todo", data, (data)=>{
      callback(data)
    })
  }
  updateTodo(data,callback){
    methods.connect("update", "todo", data, (data)=>{
      callback(data)
    })
  }
}
let todo = new Todo();
let result = {
  code: 200,
  data: null
}

/* 创建todo */
function createTodo(req,response){
  methods.getId('todoId',(id)=>{
    req.id = id
    todo.createTodo(req, function (res){
      if(res.code==200){
        result.code = 200
        result.data = '添加成功'
        response.send(result)
      }
    })
  })
  
}
/* 删除todo */
function delTodo(req,response){
  todo.delTodo(req.id,(res)=>{
    response.send(res)
  })
}
/* 修改todo */
function updateTodo(req,response){
  todo.updateTodo(req,(res)=>{
    response.send(res)
  })
}
/* 查询用户所有todo */
function searchTodo(req,response){
  todo.getTodo(req,(res)=>{
    response.send(res)
  })
}
module.exports = {
  createTodo,
  searchTodo,
  delTodo,
  updateTodo
}