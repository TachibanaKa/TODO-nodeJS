const methods = require("../index.js");
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
    });
  }
}

module.exports = {
  User,
};
