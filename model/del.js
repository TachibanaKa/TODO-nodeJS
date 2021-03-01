/* 
删除单条数据
*/  
async function delData(db, collectionName, id) {
  await db.collection(collectionName).remove({'id': id}, function (err, res) {
    if (err) {
      var result = {
        code: 500,
        data: "删除失败",
        msg: "delData函数出错",
      };
      return result;
    }
    var result = {
      code: 200,
      data: "删除成功",
    };
    return result;
  });
}
