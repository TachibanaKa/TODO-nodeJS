//用于生成和解析token
var jwt = require('jsonwebtoken');
var signkey = 'mes_qdhd_mobile_xhykjyxgs';

function setToken (username,userid){
  const token = jwt.sign({
    name:username,
    _id:userid
  },signkey,{ expiresIn:'1h' });
  return token
}
function verToken(token){
  var info = jwt.verify(token.split(' ')[1],signkey);
  return info
}
module.exports = {
  verToken,
  setToken
}