var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var vertoken = require('./utils/token')
const expressJwt = require('express-jwt')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/todo', todoRouter);
app.get('',()=>{
  console.log('test')
})
// 解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['authorization'];
  if(token == undefined){
    return next();
  }else{
    req.data = vertoken.verToken(token)
    return next()
  }
});
//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
  secret: 'HS256'/* 'mes_qdhd_mobile_xhykjyxgs' */,
  algorithms:['HS256'],//加密算法
  requestProperty: 'user'
}).unless({
  path: ['/user/login']//除了这个地址，其他的URL都需要验证
}));
//当token失效返回提示信息
app.use(function(err, req, res, next) {
  console.log(33)
  if (err.status == 401) {
    return res.status(401).send({code:301,data:'token失效'});
  }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
