/* 
参数校验
1.参数缺失
2.参数类型不匹配
param parameObj 需校验的参数对象（必传）
param typeArr  参数类型对象的数组（必传）
    {name:'test',type:str,value:'test'} type支持[str,arr,obj]
return 校验结果
*/
function parameCheck(parameObj, typeArr) {
  let result = null;
  if (!(parameObj instanceof Object) || !(typeArr instanceof Array)) {
    result = "必须传入参数对象和参数类型对象";
    console.log(result);
    return result;
  }
  typeArr.map((item, index) => {
    if (!parameObj[item.name]) {
      result = "传入的校验参数缺失";
      console.log(result);
      return result;
    }
    switch (item.type) {
      case "str":
        typeof parameObj[item.name] == "string"
          ? (result = null)
          : (result = `${item.name}值类型错误`);
        break;
      case "arr": 
        parameObj[item.name] instanceof Array
          ? (result = null)
          : (result = `${item.name}值类型错误`);
        break;
      case "obj":
        parameObj[item.name] instanceof Object
          ? (result = null)
          : (result = `${item.name}值类型错误`);
          try
          {
             JSON.parse(parameObj[item.name])
          }
          catch(err)
          {
             result = err
          }
        break;
    }
  });
  if (result !== null) {
    console.log(parameObj[item.name],result);
    return result;
  }
  return 200;
}

module.exports = {
  parameCheck,
};
