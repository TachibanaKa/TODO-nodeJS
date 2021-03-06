/* 
更新单条数据
*/  
var res = {
  code: 200,
  data: null,
};
async function updateData(db, collectionName, id, newData) {
  await db.collection(collectionName).update({'id': id}, newData, function (err, res) {
    if (err) {
      res = {
        code: 500,
        data: "更新失败",
        msg: "updateData函数出错",
      };
      return res;
    }
    res.data = '修改成功'
    return res;
  });
}
