/* 
删除单条数据
*/  
var res = {
  code: 200,
  data: null,
};
async function delData(db, collectionName, id, callback) {
  await db.collection(collectionName).remove({'id': Number(id)}, function (err, data) {
    if (err) {
      res = {
        code: 500,
        data: "删除失败",
        msg: "delData函数出错",
      };
      return res;
    }
    res.data='删除成功'
    callback(res)
    return res;
  });
}
module.exports = {
  delData
}