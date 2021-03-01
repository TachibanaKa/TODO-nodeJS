/* 
更新单条数据
*/  
async function updateData(db, collectionName, id, newData) {
  await db.collection(collectionName).update({'id': id}, newData, function (err, res) {
    if (err) {
      var result = {
        code: 500,
        data: "更新失败",
        msg: "updateData函数出错",
      };
      return result;
    }
    var result = {
      code: 200,
      data: "更新成功",
    };
    return result;
  });
}
