/* 
删除单条数据
*/  
var res = {
  code: 200,
  data: null,
};
async function delData(db, collectionName, id) {
  await db.collection(collectionName).remove({'id': id}, function (err, res) {
    if (err) {
      res = {
        code: 500,
        data: "删除失败",
        msg: "delData函数出错",
      };
      return res;
    }
    res.data='删除成功'
    return res;
  });
}
