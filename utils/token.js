//用于生成和解析token
var jwt = require('jsonwebtoken');
//var signkey = 'mes_qdhd_mobile_xhykjyxgs';HS256
var signkey = 'HS256';

function setToken (username,userid){
  const token = jwt.sign({
    name:username,
    _id:userid
  },signkey,{ expiresIn:'1h' });
  return token
}
function verToken(token){
  var info = ''
  jwt.verify(token.split(' ')[1],signkey,(data)=>{
    info = data  // token正确时data为null
  });
  return info
}
module.exports = {
  verToken,
  setToken
}