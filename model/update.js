/* 
更新单条数据
*/  
var res = {
  code: 200,
  data: null,
};
async function updateData(db, collectionName, id, newData, callback) {
  let oldData = null
  await db
    .collection(collectionName)
    .find({'id':Number(id)})
    .toArray()
    .then(
      function (data) {
        oldData = data[0]
      },
      function (err) {
        res.code = 500;
        res.data = `updateData函数查找失败${err}`;
      }
    );
  newData = JSON.parse(newData)
  for (let i in newData){
    oldData[i] = newData[i]
  }
  await db.collection(collectionName)
  .updateOne(
    {'id': Number(id)},
    { $set: oldData },
    { new: true },
    function (err, data) {
    if (err) {
      res = {
        code: 500,
        data: "更新失败",
        msg: "updateData函数出错",
      };
      return res;
    }
    res.data = '修改成功'
    callback(res)
    return res;
  });
}

module.exports = {
  updateData
}